import { draftMode } from 'next/headers';
import { isCustomerPreview } from './customer-preview';

export async function getContentPreview() {
  // Always read request state to keep draft content out of the static cache.
  const mode = await draftMode();
  return { isEnabled: isCustomerPreview() || mode.isEnabled };
}
