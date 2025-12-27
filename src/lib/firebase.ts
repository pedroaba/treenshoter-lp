import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

import { env } from '@/env'

let app: ReturnType<typeof initializeApp>
const apps = getApps()

if (apps.length > 0) {
  app = apps[0]
} else {
  app = initializeApp({
    credential: cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: Buffer.from(env.FIREBASE_PRIVATE_KEY, 'base64')
        .toString()
        .replace(/\\n/g, '\n'),
    }),
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
  })
}

const storage = getStorage(app).bucket()
const firestore = getFirestore(app)

export { app, storage, firestore }
