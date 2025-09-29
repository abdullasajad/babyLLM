package com.babyllm.android.data.api

import com.babyllm.android.data.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    @GET("search")
    suspend fun search(
        @Query("q") query: String,
        @Header("Authorization") token: String? = null
    ): Response<SearchResponse>

    @POST("auth/login")
    suspend fun login(@Body request: AuthRequest): Response<AuthResponse>

    @POST("auth/signup")
    suspend fun signup(@Body request: AuthRequest): Response<AuthResponse>

    @POST("summary/webpage")
    suspend fun generateSummary(
        @Body request: SummaryRequest,
        @Header("Authorization") token: String? = null
    ): Response<SummaryResponse>

    @GET("health")
    suspend fun healthCheck(): Response<Map<String, Any>>
}
