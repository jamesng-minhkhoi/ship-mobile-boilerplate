/**
 * Supabase Client Configuration
 */

import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decode } from 'base64-arraybuffer';
// NOTE: Uncomment below when using expo-file-system
// import * as FileSystem from 'expo-file-system/legacy';

// Replace with your Supabase URL and anon key
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// For type safety, generate types from your Supabase schema:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.types.ts
// Then import and use: createClient<Database>(...)

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

/**
 * Uploads a file to Supabase storage and returns the public URL
 * @param fileUri - The URI of the file to upload
 * @param bucketName - The name of the storage bucket
 * @param userId - The user ID for the file path
 * @param fileType - The type of file ('image' or 'video')
 * @returns The public URL of the uploaded file
 */
export const uploadFileToStorage = async (
    fileUri: string,
    bucketName: string,
    userId: string,
    fileType: 'image' | 'video'
): Promise<string | null> => {
    try {
        if (!fileUri) return null;

        // NOTE: Uncomment when using expo-file-system
        // const base64 = await FileSystem.readAsStringAsync(fileUri, {
        //   encoding: 'base64'
        // });

        // For now, return null - implement with expo-file-system
        console.warn("uploadFileToStorage requires expo-file-system");
        return null;

        // const filePath = `${userId}/${new Date().getTime()}.${fileType === 'image' ? 'png' : 'mp4'}`;
        // const contentType = fileType === 'image' ? 'image/png' : 'video/mp4';

        // const { data, error } = await supabase.storage
        //   .from(bucketName)
        //   .upload(filePath, decode(base64), { contentType });

        // if (error) throw error;

        // const { data: { publicUrl } } = supabase.storage
        //   .from(bucketName)
        //   .getPublicUrl(filePath);

        // return publicUrl;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};
