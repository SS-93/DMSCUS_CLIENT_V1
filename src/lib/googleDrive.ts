export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink: string;
  iconLink: string;
}

export interface DriveResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

export const getDriveFiles = async (folderId?: string | null): Promise<DriveResponse> => {
  try {
    const query = folderId ? `'${folderId}' in parents` : '';
    const response = await fetch('/api/drive/files' + (query ? `?q=${encodeURIComponent(query)}` : ''));
    if (!response.ok) throw new Error('Failed to fetch files');
    return response.json();
  } catch (error) {
    console.error('Error fetching drive files:', error);
    throw error;
  }
};

export const searchDriveFiles = async (query: string): Promise<DriveResponse> => {
  try {
    const response = await fetch(`/api/drive/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search files');
    return response.json();
  } catch (error) {
    console.error('Error searching drive files:', error);
    throw error;
  }
}; 