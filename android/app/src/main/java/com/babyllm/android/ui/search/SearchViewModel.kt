package com.babyllm.android.ui.search

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.babyllm.android.data.model.SearchResult
import com.babyllm.android.data.repository.SearchRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

data class SearchState(
    val isLoading: Boolean = false,
    val results: List<SearchResult> = emptyList(),
    val query: String = "",
    val error: String? = null,
    val relatedQueries: List<String> = emptyList()
)

class SearchViewModel : ViewModel() {
    private val searchRepository = SearchRepository()
    
    private val _searchState = MutableStateFlow(SearchState())
    val searchState: StateFlow<SearchState> = _searchState.asStateFlow()
    
    fun search(query: String, token: String? = null) {
        viewModelScope.launch {
            _searchState.value = _searchState.value.copy(
                isLoading = true,
                query = query,
                error = null
            )
            
            searchRepository.search(query, token)
                .onSuccess { response ->
                    _searchState.value = _searchState.value.copy(
                        isLoading = false,
                        results = response.results,
                        relatedQueries = response.relatedQueries,
                        error = null
                    )
                }
                .onFailure { exception ->
                    _searchState.value = _searchState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Search failed"
                    )
                }
        }
    }
    
    fun generateSummary(resultId: String, url: String, token: String? = null) {
        viewModelScope.launch {
            // Update the specific result to show loading
            _searchState.value = _searchState.value.copy(
                results = _searchState.value.results.map { result ->
                    if (result.id == resultId) {
                        result.copy(isSummaryLoading = true)
                    } else {
                        result
                    }
                }
            )
            
            searchRepository.generateSummary(url, token)
                .onSuccess { response ->
                    if (response.success && response.data != null) {
                        _searchState.value = _searchState.value.copy(
                            results = _searchState.value.results.map { result ->
                                if (result.id == resultId) {
                                    result.copy(
                                        summary = response.data.summary,
                                        isSummaryLoading = false
                                    )
                                } else {
                                    result
                                }
                            }
                        )
                    } else {
                        // Handle failed summary generation
                        _searchState.value = _searchState.value.copy(
                            results = _searchState.value.results.map { result ->
                                if (result.id == resultId) {
                                    result.copy(isSummaryLoading = false)
                                } else {
                                    result
                                }
                            }
                        )
                    }
                }
                .onFailure { exception ->
                    _searchState.value = _searchState.value.copy(
                        results = _searchState.value.results.map { result ->
                            if (result.id == resultId) {
                                result.copy(isSummaryLoading = false)
                            } else {
                                result
                            }
                        }
                    )
                }
        }
    }
    
    fun clearError() {
        _searchState.value = _searchState.value.copy(error = null)
    }
}
