package com.babyllm.android.ui.auth

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.babyllm.android.data.model.User
import com.babyllm.android.data.repository.AuthRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch

data class AuthState(
    val isAuthenticated: Boolean = false,
    val user: User? = null,
    val token: String? = null,
    val isLoading: Boolean = false,
    val error: String? = null
)

class AuthViewModel(application: Application) : AndroidViewModel(application) {
    private val authRepository = AuthRepository(application)
    
    private val _authState = MutableStateFlow(AuthState())
    val authState: StateFlow<AuthState> = _authState.asStateFlow()
    
    init {
        viewModelScope.launch {
            combine(
                authRepository.authToken,
                authRepository.user
            ) { token, user ->
                _authState.value = _authState.value.copy(
                    isAuthenticated = token != null,
                    token = token,
                    user = user,
                    isLoading = false
                )
            }.collect { /* Collect to activate the flow */ }
        }
    }
    
    fun login(email: String, password: String) {
        viewModelScope.launch {
            _authState.value = _authState.value.copy(isLoading = true, error = null)
            
            authRepository.login(email, password)
                .onSuccess { response ->
                    if (response.success) {
                        _authState.value = _authState.value.copy(
                            isLoading = false,
                            error = null
                        )
                    } else {
                        _authState.value = _authState.value.copy(
                            isLoading = false,
                            error = response.message
                        )
                    }
                }
                .onFailure { exception ->
                    _authState.value = _authState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Login failed"
                    )
                }
        }
    }
    
    fun signup(email: String, password: String, name: String) {
        viewModelScope.launch {
            _authState.value = _authState.value.copy(isLoading = true, error = null)
            
            authRepository.signup(email, password, name)
                .onSuccess { response ->
                    if (response.success) {
                        _authState.value = _authState.value.copy(
                            isLoading = false,
                            error = null
                        )
                    } else {
                        _authState.value = _authState.value.copy(
                            isLoading = false,
                            error = response.message
                        )
                    }
                }
                .onFailure { exception ->
                    _authState.value = _authState.value.copy(
                        isLoading = false,
                        error = exception.message ?: "Signup failed"
                    )
                }
        }
    }
    
    fun logout() {
        viewModelScope.launch {
            authRepository.logout()
        }
    }
    
    fun clearError() {
        _authState.value = _authState.value.copy(error = null)
    }
}
