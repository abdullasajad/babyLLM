package com.babyllm.android.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.babyllm.android.data.api.ApiClient
import com.babyllm.android.data.model.AuthRequest
import com.babyllm.android.data.model.AuthResponse
import com.babyllm.android.data.model.User
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import retrofit2.Response

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "auth_prefs")

class AuthRepository(private val context: Context) {
    private val apiService = ApiClient.apiService
    
    companion object {
        private val TOKEN_KEY = stringPreferencesKey("auth_token")
        private val USER_EMAIL_KEY = stringPreferencesKey("user_email")
        private val USER_NAME_KEY = stringPreferencesKey("user_name")
    }

    val authToken: Flow<String?> = context.dataStore.data.map { preferences ->
        preferences[TOKEN_KEY]
    }

    val user: Flow<User?> = context.dataStore.data.map { preferences ->
        val email = preferences[USER_EMAIL_KEY]
        val name = preferences[USER_NAME_KEY]
        if (email != null && name != null) {
            User(email, name)
        } else null
    }

    suspend fun login(email: String, password: String): Result<AuthResponse> {
        return try {
            val response = apiService.login(AuthRequest(email, password))
            if (response.isSuccessful && response.body() != null) {
                val authResponse = response.body()!!
                if (authResponse.success && authResponse.token != null) {
                    saveAuthData(authResponse.token, authResponse.user)
                }
                Result.success(authResponse)
            } else {
                val errorMsg = when (response.code()) {
                    400 -> "Invalid email or password format"
                    401 -> "Invalid credentials. Please check your email and password."
                    404 -> "Authentication service not found"
                    500 -> "Server error. Please try again later"
                    503 -> "Service temporarily unavailable"
                    else -> "Login failed: ${response.message()}"
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
            Result.failure(Exception("Login failed: ${e.message ?: "Unknown error"}"))
        }
    }

    suspend fun signup(email: String, password: String, name: String): Result<AuthResponse> {
        return try {
            val response = apiService.signup(AuthRequest(email, password, name))
            if (response.isSuccessful && response.body() != null) {
                val authResponse = response.body()!!
                if (authResponse.success && authResponse.token != null) {
                    saveAuthData(authResponse.token, authResponse.user)
                }
                Result.success(authResponse)
            } else {
                val errorMsg = when (response.code()) {
                    400 -> "Invalid input. Please check your information."
                    409 -> "Email already registered. Please login instead."
                    404 -> "Authentication service not found"
                    500 -> "Server error. Please try again later"
                    503 -> "Service temporarily unavailable"
                    else -> "Signup failed: ${response.message()}"
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
            Result.failure(Exception("Signup failed: ${e.message ?: "Unknown error"}"))
        }
    }

    suspend fun logout() {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }

    private suspend fun saveAuthData(token: String, user: User?) {
        context.dataStore.edit { preferences ->
            preferences[TOKEN_KEY] = token
            user?.let {
                preferences[USER_EMAIL_KEY] = it.email
                preferences[USER_NAME_KEY] = it.name
            }
        }
    }
}
