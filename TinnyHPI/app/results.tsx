import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { uploadCSVToServer } from '@/utils/csvExport';

export default function ResultsScreen() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  // Attempt to upload data when the screen loads
  useEffect(() => {
    uploadData();
  }, []);

  const uploadData = async () => {
    setIsUploading(true);
    try {
      const result = await uploadCSVToServer();
      if (result.success) {
        setUploadStatus('success');
        console.log('Data uploaded successfully');
        
        // Add a short delay before navigating to the analysis page
        setTimeout(() => {
          router.push('/analysis');
        }, 1500);
      } else {
        setUploadStatus('error');
        console.error('Upload failed:', result.error);
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFinish = () => {
    // Return to home screen
    router.replace('/');
  };
  
  return (
    <ThemedView style={styles.container}>
      <View style={styles.iconContainer}>
        <IconSymbol name="checkmark.circle.fill" size={80} color="#4CAF50" />
      </View>
      
      <ThemedText type="title" style={styles.title}>
        Thank You!
      </ThemedText>
      
      <ThemedText style={styles.message}>
        Your responses have been recorded. This information helps us understand your tinnitus patterns better.
      </ThemedText>
      
      {/* Upload status indicator */}
      <View style={styles.uploadStatusContainer}>
        {isUploading ? (
          <View style={styles.uploadingContainer}>
            <ActivityIndicator size="small" color="#A1CEDC" />
            <ThemedText style={styles.uploadingText}>Syncing data...</ThemedText>
          </View>
        ) : uploadStatus === 'success' ? (
          <ThemedText style={styles.uploadSuccess}>Data synced successfully</ThemedText>
        ) : uploadStatus === 'error' ? (
          <View>
            <ThemedText style={styles.uploadError}>Failed to sync data</ThemedText>
            <TouchableOpacity style={styles.retryButton} onPress={uploadData}>
              <ThemedText style={styles.retryText}>Retry</ThemedText>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      
      <ThemedText style={styles.tip}>
        Tip: Try to maintain a consistent sleep schedule to help manage tinnitus symptoms.
      </ThemedText>
      
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <ThemedText style={styles.buttonText}>Finish</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  uploadStatusContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadingText: {
    marginLeft: 10,
    color: '#666',
  },
  uploadSuccess: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  uploadError: {
    color: '#F44336',
    fontWeight: '500',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F1F1F1',
    borderRadius: 4,
  },
  retryText: {
    color: '#666',
    textAlign: 'center',
  },
  tip: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    padding: 16,
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#A1CEDC',
  },
  finishButton: {
    backgroundColor: '#A1CEDC',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3D47',
  },
});
