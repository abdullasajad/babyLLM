package com.babyllm.android.data.model

import com.google.gson.annotations.SerializedName

data class SearchResult(
    @SerializedName("id")
    val id: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("url")
    val url: String,
    @SerializedName("snippet")
    val snippet: String,
    @SerializedName("displayUrl")
    val displayUrl: String? = null,
    var summary: String? = null,
    var isSummaryLoading: Boolean = false
)

data class SearchResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("query")
    val query: String,
    @SerializedName("totalEstimatedMatches")
    val totalEstimatedMatches: Int,
    @SerializedName("results")
    val results: List<SearchResult>,
    @SerializedName("relatedQueries")
    val relatedQueries: List<String>
)

data class AuthRequest(
    @SerializedName("email")
    val email: String,
    @SerializedName("password")
    val password: String,
    @SerializedName("name")
    val name: String? = null
)

data class AuthResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("message")
    val message: String,
    @SerializedName("token")
    val token: String? = null,
    @SerializedName("user")
    val user: User? = null
)

data class User(
    @SerializedName("email")
    val email: String,
    @SerializedName("name")
    val name: String
)

data class SummaryRequest(
    @SerializedName("url")
    val url: String
)

data class SummaryResponse(
    @SerializedName("success")
    val success: Boolean,
    @SerializedName("data")
    val data: SummaryData? = null
)

data class SummaryData(
    @SerializedName("url")
    val url: String,
    @SerializedName("title")
    val title: String,
    @SerializedName("summary")
    val summary: String,
    @SerializedName("processedAt")
    val processedAt: String
)
