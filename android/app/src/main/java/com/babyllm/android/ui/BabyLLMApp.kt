package com.babyllm.android.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.babyllm.android.ui.auth.AuthViewModel
import com.babyllm.android.ui.auth.AuthViewModelFactory
import com.babyllm.android.ui.auth.LoginScreen
import com.babyllm.android.ui.auth.SignupScreen
import com.babyllm.android.ui.home.HomeScreen
import com.babyllm.android.ui.search.SearchScreen
import com.babyllm.android.ui.settings.SettingsScreen

@Composable
fun BabyLLMApp(
    navController: NavHostController = rememberNavController()
) {
    val context = LocalContext.current
    val authViewModel: AuthViewModel = viewModel(
        factory = AuthViewModelFactory(context.applicationContext as android.app.Application)
    )
    val authState by authViewModel.authState.collectAsState()
    
    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        composable("home") {
            HomeScreen(
                navController = navController,
                authViewModel = authViewModel,
                isAuthenticated = authState.isAuthenticated
            )
        }
        
        composable("search/{query}") { backStackEntry ->
            val query = backStackEntry.arguments?.getString("query") ?: ""
            SearchScreen(
                query = query,
                navController = navController,
                authViewModel = authViewModel
            )
        }
        
        composable("login") {
            LoginScreen(
                navController = navController,
                authViewModel = authViewModel
            )
        }
        
        composable("signup") {
            SignupScreen(
                navController = navController,
                authViewModel = authViewModel
            )
        }
        
        composable("settings") {
            SettingsScreen(
                navController = navController,
                authViewModel = authViewModel
            )
        }
    }
}
