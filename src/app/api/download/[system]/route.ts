import { type NextRequest, NextResponse } from 'next/server'

import { firestore, storage } from '@/lib/firebase'
import type { Release } from '@/types/firebase'
import { type DownloadType, getDownloadName } from '@/utils/get-download-name'
import { indexify } from '@/utils/indexify'

type RouteContext = {
  params: Promise<{
    system: string
  }>
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { system } = await params
  const searchParams = request.nextUrl.searchParams

  const version = searchParams.get('version')
  const type = searchParams.get('type') as DownloadType
  console.log(version, type)

  if (!type) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  const releases = await firestore
    .collection('releases')
    .orderBy('versionIndex', 'desc')
    .get()

  if (releases.empty) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  const parsedReleases = releases.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Release[]

  let release: Release | undefined = parsedReleases[0]
  if (version) {
    release = parsedReleases.find(
      (release) => String(release.versionIndex) === indexify(version),
    )
  }

  console.log('release', release)
  if (!release) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  const filename = getDownloadName(release.id.replace('v', ''), type)
  const files = await releases.docs
    .find((doc) => doc.id === release.id)
    ?.ref.collection('files')
    .listDocuments()

  const fileRef = files?.find((doc) => doc.id === filename)
  if (!fileRef) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  const file = await fileRef.get()
  if (!file.exists) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  const filedata = file.data() as {
    filename: string
  }

  const fileUrl = await storage
    .file(`releases/${release.id}/${system}/${filedata.filename}`)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60 * 1, // 1
    })

  const signedUrl = fileUrl[0]
  console.log('signedUrl', signedUrl)
  if (!signedUrl) {
    return NextResponse.redirect(new URL('/not-found', request.nextUrl))
  }

  // Redireciona para página de agradecimento com os parâmetros necessários
  const thankYouUrl = new URL('/download/thank-you', request.nextUrl.origin)
  thankYouUrl.searchParams.set('url', signedUrl)
  thankYouUrl.searchParams.set('filename', filedata.filename)
  thankYouUrl.searchParams.set('system', system)

  return NextResponse.redirect(thankYouUrl)
}
