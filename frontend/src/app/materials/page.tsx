/**
 * UPSC Mentor - Vectorized Study Repository Page
 * Explicitly set to dynamic (revalidate = 0) to avoid build-time static generation errors.
 */
export const revalidate = 0;
export const dynamic = 'force-dynamic';

import MaterialsClient from './materials-client';

export default function MaterialsPage() {
  return <MaterialsClient />;
}
