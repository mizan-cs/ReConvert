<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ShopifyAppController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>['verify.shopify','web']], function (){
    Route::get('/',[ShopifyAppController::class,'index'])->name('home');
    Route::get('/install', [ShopifyAppController::class,'installScriptTag'])->name('installScriptTag');
    Route::post('/save-design',[ShopifyAppController::class,'saveDesign'])->name('saveDesign');
});

Route::post('/webhook/app-uninstalled',[ShopifyAppController::class,'uninstallApp'])->name('uninstallApp');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');
