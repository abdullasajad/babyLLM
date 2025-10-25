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
                val errorMsg = when (response.code()) {
                    400 -> "Invalid search query"
                    401 -> "Authentication required"
                    403 -> "Access denied"
                    404 -> "Search service not found"
                    500 -> "Server error. Please try again later"
                    503 -> "Service temporarily unavailable"
                    else -> "Search failed: ${response.message()}"
                }
                Result.failure(Exception(errorMsg))
            }
        } catch (e: java.net.UnknownHostException) {
            Result.failure(Exception("Cannot connect to server. Check your internet connection."))
        } catch (e: java.net.SocketTimeoutException) {
            Result.failure(Exception("Request timed out. Please try again."))
        } catch (e: java.io.IOException) {
            Result.failure(Exception("Network error: ${e.message ?: "Unable to connect"}"))
        } catch (e: Exception) {
            Result.failure(Exception("Search failed: ${e.message ?: "Unknown error"}"))
        }
    }

    suspend fun generateSummary(url: String, token: String? = null): Result<SummaryResponse> {
        return try {
            val authHeader = token?.let { "Bearer $it" }
            val response = apiService.generateSummary(SummaryRequest(url), authHeader)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                val errorMsg = when (response.code()) {
                    400 -> "Invalid URL provided"
                    401 -> "Authentication required"
                    403 -> "Access denied"
                    404 -> "Summary service not found"
                    500 -> "Server error. Please try again later"
                    503 -> "Service temporarily unavailable"
                    else -> "Summary generation failed: ${response.message()}"
                }
                Result.failure(Exception(errorMsg))
            }
        } catch (e: java.net.UnknownHostException) {
            Result.failure(Exception("Cannot connect to server. Check your internet connection."))
        } catch (e: java.net.SocketTimeoutException) {
            Result.failure(Exception("Request timed out. Please try again."))
        } catch (e: java.io.IOException) {
            Result.failure(Exception("Network error: ${e.message ?: "Unable to connect"}"))
        } catch (e: Exception) {
            Result.failure(Exception("Summary generation failed: ${e.message ?: "Unknown error"}"))
        }
    }
}
