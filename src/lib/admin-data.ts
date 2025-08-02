// Shared data store for creator applications and spots
// In production, this would be replaced with a database

export interface CreatorApplication {
  id: string;
  name: string;
  email: string;
  subCount: string;
  platformLink: string;
  agency?: string;
  kinkContentType?: string[];
  location?: string;
  additionalInfo?: string;
  ip?: string;
  country?: string;
  timestamp?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  rejectedAt?: string;
}

// Shared state
let FOUNDING_CREATOR_SPOTS_REMAINING = 88;
let creatorApplications: CreatorApplication[] = [];

// Getter and setter functions for spots
export function getSpotsRemaining(): number {
  return FOUNDING_CREATOR_SPOTS_REMAINING;
}

export function setSpotsRemaining(spots: number): void {
  FOUNDING_CREATOR_SPOTS_REMAINING = Math.max(0, Math.min(100, spots));
}

export function decrementSpots(): number {
  if (FOUNDING_CREATOR_SPOTS_REMAINING > 0) {
    FOUNDING_CREATOR_SPOTS_REMAINING--;
  }
  return FOUNDING_CREATOR_SPOTS_REMAINING;
}

// Application management
export function addApplication(application: Omit<CreatorApplication, 'id' | 'status' | 'createdAt'>): string {
  const id = Date.now() + Math.random().toString(36).substr(2, 9);
  const newApplication: CreatorApplication = {
    ...application,
    id,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  creatorApplications.push(newApplication);
  return id;
}

export function getAllApplications(): CreatorApplication[] {
  return [...creatorApplications]; // Return copy to prevent external modification
}

export function updateApplicationStatus(id: string, status: 'approved' | 'rejected'): boolean {
  const index = creatorApplications.findIndex(app => app.id === id);
  if (index !== -1) {
    creatorApplications[index].status = status;
    if (status === 'approved') {
      creatorApplications[index].approvedAt = new Date().toISOString();
    } else if (status === 'rejected') {
      creatorApplications[index].rejectedAt = new Date().toISOString();
    }
    return true;
  }
  return false;
}

export function deleteApplication(id: string): boolean {
  const index = creatorApplications.findIndex(app => app.id === id);
  if (index !== -1) {
    creatorApplications.splice(index, 1);
    return true;
  }
  return false;
}

export function getApplicationStats() {
  const totalApplications = creatorApplications.length;
  const spotsUsed = 100 - FOUNDING_CREATOR_SPOTS_REMAINING;
  return {
    totalApplications,
    spotsRemaining: FOUNDING_CREATOR_SPOTS_REMAINING,
    spotsUsed,
    totalSpots: 100,
    pendingApplications: creatorApplications.filter(app => app.status === 'pending').length,
    approvedApplications: creatorApplications.filter(app => app.status === 'approved').length,
    rejectedApplications: creatorApplications.filter(app => app.status === 'rejected').length
  };
}
