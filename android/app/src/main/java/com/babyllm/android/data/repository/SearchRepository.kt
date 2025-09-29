package com.babyllm.android.data.repository

import com.babyllm.android.data.api.ApiClient
import com.babyllm.android.data.model.SearchResponse
import com.babyllm.android.data.model.SummaryRequest
import com.babyllm.android.data.model.SummaryResponse

class SearchRepository {
    private val apiService = ApiClient.apiService

    suspend fun search(query: String, token: String? = null): Result<SearchResponse> {
        return try {
            val authHeader = token?.let { "Bearer $it" }
            val response = apiService.search(query, authHeader)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Search failed: ${response.message()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun generateSummary(url: String, token: String? = null): Result<SummaryResponse> {
        return try {
            val authHeader = token?.let { "Bearer $it" }
            val response = apiService.generateSummary(SummaryRequest(url), authHeader)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Summary generation failed: ${response.message()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
