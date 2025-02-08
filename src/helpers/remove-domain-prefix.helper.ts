/**
 * Remove the domain prefix from an entity ID.
 *
 * @param entityId The entity ID to process.
 * @returns The entity ID without the domain prefix.
 */
export const removeDomainPrefix = (entityId: string): string => {
  return entityId.split('.')[1] || entityId;
};
