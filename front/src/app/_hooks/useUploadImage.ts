import { useMutation } from '@apollo/client';
import { gql } from '@/__generated__';

const UPLOAD_IMAGE = gql(`
  mutation UploadImage($file: File!) {
    uploadImage(file: $file) {
      id
      originalName
      mimeType
      size
      uploadedAt
    }
  }
`);

export interface UseUploadImageOptions {
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useUploadImage(options?: UseUploadImageOptions) {
  const [uploadImage, { loading, error, data }] = useMutation(UPLOAD_IMAGE, {
    onCompleted: (responseData) => {
      options?.onCompleted?.(responseData);
    },
    onError: (mutationError) => {
      // eslint-disable-next-line no-console
      console.error('Error uploading image:', mutationError);
      options?.onError?.(mutationError);
    },
  });

  const upload = async (file: File) => {
    try {
      const result = await uploadImage({
        variables: {
          file,
        },
      });
      return result.data?.uploadImage;
    } catch (err) {
      // Error already handled by onError callback
      return null;
    }
  };

  return {
    upload,
    loading,
    error,
    data,
  };
}
