import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Text, Card, Button, useTheme, Searchbar } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  summary?: string;
  isSummaryLoading?: boolean;
}

const SearchScreen = () => {
  const { q } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState(typeof q === 'string' ? q : '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const theme = useTheme();
  const router = useRouter();
  const { token } = useAuth();

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      // TODO: Show error to user
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    fetchSearchResults(searchQuery);
  };

  const handleRefresh = () => {
    if (!searchQuery.trim()) return;
    setIsRefreshing(true);
    fetchSearchResults(searchQuery);
  };

  const handleGenerateSummary = async (resultId: string) => {
    try {
      setResults(prevResults => 
        prevResults.map(result => 
          result.id === resultId 
            ? { ...result, isSummaryLoading: true } 
            : result
        )
      );

      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ url: results.find(r => r.id === resultId)?.url })
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const { summary } = await response.json();

      setResults(prevResults => 
        prevResults.map(result => 
          result.id === resultId 
            ? { 
                ...result, 
                summary,
                isSummaryLoading: false 
              } 
            : result
        )
      );
    } catch (error) {
      console.error('Error generating summary:', error);
      // TODO: Show error to user
      setResults(prevResults => 
        prevResults.map(result => 
          result.id === resultId 
            ? { ...result, isSummaryLoading: false } 
            : result
        )
      );
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, []);

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <Card style={styles.resultCard}>
      <Card.Title 
        title={item.title} 
        titleNumberOfLines={2}
        titleStyle={styles.resultTitle}
      />
      <Card.Content>
        <Text style={styles.resultUrl} numberOfLines={1}>
          {new URL(item.url).hostname.replace('www.', '')}
        </Text>
        <Text style={styles.resultSnippet} numberOfLines={3}>
          {item.snippet}
        </Text>
        
        {item.summary ? (
          <View style={styles.summaryContainer}>
            <Text variant="titleSmall" style={styles.summaryTitle}>AI Summary:</Text>
            <Text style={styles.summaryText}>{item.summary}</Text>
          </View>
        ) : (
          <Button 
            mode="text" 
            onPress={() => handleGenerateSummary(item.id)}
            loading={item.isSummaryLoading}
            disabled={item.isSummaryLoading}
            style={styles.summaryButton}
          >
            Generate AI Summary
          </Button>
        )}
      </Card.Content>
      <Card.Actions>
        <Button 
          mode="contained" 
          onPress={() => router.push(`/webview?url=${encodeURIComponent(item.url)}`)}
          style={styles.viewButton}
        >
          View Page
        </Button>
        <Button 
          mode="outlined" 
          onPress={() => router.push(`/chat?contextUrl=${encodeURIComponent(item.url)}`)}
          style={styles.chatButton}
        >
          Chat with AI
        </Button>
      </Card.Actions>
    </Card>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Searching for "{searchQuery}"...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search babyLLM..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
          icon="arrow-left"
          onIconPress={() => router.back()}
          returnKeyType="search"
        />
      </View>

      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
            <Button 
              mode="contained" 
              onPress={handleSearch}
              style={styles.retryButton}
            >
              Try Again
            </Button>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBar: {
    elevation: 2,
  },
  resultsContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  resultCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultUrl: {
    color: '#1a0dab',
    fontSize: 14,
    marginBottom: 4,
  },
  resultSnippet: {
    color: '#4d5156',
    fontSize: 14,
    marginBottom: 12,
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4a6fa5',
  },
  summaryTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#202124',
  },
  summaryText: {
    color: '#4d5156',
    fontSize: 14,
    lineHeight: 20,
  },
  summaryButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  viewButton: {
    marginRight: 8,
  },
  chatButton: {
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#5f6368',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#5f6368',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    width: 200,
  },
});

export default SearchScreen;
