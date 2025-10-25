package com.babyllm.android.data.api

import com.babyllm.android.BuildConfig
import com.google.gson.GsonBuilder
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.IOException
import java.util.concurrent.TimeUnit

object ApiClient {
    private val BASE_URL = try {
        val url = BuildConfig.API_BASE_URL
        if (url.endsWith("/")) url else "$url/"
    } catch (e: Exception) {
        "http://10.0.2.2:5000/api/"
    }

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = if (BuildConfig.DEBUG) {
            HttpLoggingInterceptor.Level.BODY
        } else {
            HttpLoggingInterceptor.Level.NONE
        }
    }

    // Error handling interceptor
    private val errorInterceptor = Interceptor { chain ->
        val request = chain.request()
        try {
            val response = chain.proceed(request)
            response
        } catch (e: IOException) {
            throw IOException("Network error: ${e.message ?: "Unable to connect to server"}")
        } catch (e: Exception) {
            throw Exception("Request failed: ${e.message ?: "Unknown error"}")
        }
    }

    // Retry interceptor for failed requests
    private val retryInterceptor = Interceptor { chain ->
        val request = chain.request()
        var response: Response? = null
        var exception: IOException? = null
        var tryCount = 0
        val maxRetries = 2

        while (tryCount < maxRetries) {
            try {
                response = chain.proceed(request)
                if (response.isSuccessful) {
                    return@Interceptor response
                }
                response.close()
            } catch (e: IOException) {
                exception = e
            }
            tryCount++
            if (tryCount < maxRetries) {
                Thread.sleep(1000L * tryCount) // Exponential backoff
            }
        }

        // Return last response or throw exception
        response ?: throw (exception ?: IOException("Request failed after $maxRetries retries"))
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .addInterceptor(errorInterceptor)
        .addInterceptor(retryInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .retryOnConnectionFailure(true)
        .build()

    private val gson = GsonBuilder()
        .setLenient()
        .create()

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttpClient)
        .addConverterFactory(GsonConverterFactory.create(gson))
        .build()

    val apiService: ApiService = retrofit.create(ApiService::class.java)
}
