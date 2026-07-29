/**
 * UPSC Mentor - Vectorized Study Repository Page
 * Explicitly configured as dynamic route (revalidate = 0) for production deployment.
 */
export const revalidate = 0;
export const dynamic = 'force-dynamic';

import MaterialsClient from './materials-client';

export default function MaterialsPage() {
  return <MaterialsClient />;
}
