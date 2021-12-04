<?php

namespace App\Http\Controllers;

use App\Models\CartDesign;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ShopifyAppController extends Controller
{
    /**
     * Display app designer page.
     *
     * @return Inertia/Inertia
     */
    public function index(Request $request)
    {
        $shop = Auth::user();

        // Check app has the script tag, If not then create.
        if (!$this->checkIfStoreHaveScriptTag($shop)){
            $this->installScriptTag();
        }

        $cardDesign = $shop->cartDesign;

        // Create shop popup box design if not exist
        if ($cardDesign == null){
            $cardDesign = $this->createNewCartDesign($shop);
        }

        return Inertia::render('App', compact('cardDesign'));
    }

    /**
     * Install script tag
     *
     * @return void
     */
    public function installScriptTag() {
        $shop = Auth::user();

        if ($this->checkIfStoreHaveScriptTag($shop)) {return;};

        // Set this to constant variable
        $appScriptTagUrl = env('SHOPIFY_SCRIPT_TAG_URL');
        $context = [
            "script_tag" => [
                "event"             => "onload",
                "src"               => $appScriptTagUrl
            ]
        ];
        $resp = $shop->api()->rest('POST', '/admin/api/script_tags.json', $context);
        return;
    }

    /**
     * Check if store already have the script tag
     *
     * @param User
     * @return boolen
     */
    public function checkIfStoreHaveScriptTag(User $shop) {
        // URL of the app script tag
        $appScriptTagUrl = env('SHOPIFY_SCRIPT_TAG_URL');

        $scriptTags = $shop->api()->rest('GET', '/admin/api/script_tags.json')['body']->container['script_tags'];
        foreach ($scriptTags as $scriptTag){
            if ($scriptTag['src'] == $appScriptTagUrl){
                return true;
            }
        }

        return false;
    }

    /**
     * Get shop popup box design
     * @param Illuminate\Http\Request
     *
     * @return object
     */
    public function shopDesign (Request $request) {
        $shop = User::where('name', $request->get('name'))->first();

        if ($shop){
            $design = $shop->cartDesign;
            if ($design){
                return response()->json(
                    [
                        'status'    =>'success',
                        'data'      =>$design->toArray()
                    ]);
            }
            $data = [
                'button_label'      => 'Add To Cart',
                'button_color'      => '#000'
            ];
            return response()->json(
                [
                    'status'        =>'success',
                    'data'          => $data
                ]);
        }

        return response()->json(
            [
                'status'            =>'error',
                'message'           =>'Invalid shop name'
            ]);
    }


    /**
     * Save design data
     *
     * @return @return \Illuminate\Http\Response
     */
    public function saveDesign (Request $request)
    {

        Validator::make($request->all(), [
            'button_label' => ['required', 'string', 'max:255'],
            'button_color' => ['required', 'string', 'max:255'],
        ])->validateWithBag('updateDesign');

        $shop = Auth::user();
        $cardDesign = $shop->cartDesign;
        if ($cardDesign == null){
            $cardDesign = $this->createNewCartDesign($shop);
        }

        $cardDesign->button_label = $request->get('button_label');
        $cardDesign->button_color = $request->get('button_color');
        $cardDesign->save();

        return redirect()->back();

    }

    /**
     * Create a new cart design
     *
     * @param \App\Models\CartDesign  $shop
     * @return object
     */
    public function createNewCartDesign(User $shop) {
        $cardDesign = new CartDesign();
        $cardDesign->button_label = 'Add To Cart';
        $cardDesign->button_color = '#000';
        $cardDesign->user()->associate($shop);
        $cardDesign->save();

        return $cardDesign;
    }

    public function uninstallApp (Request $request) {
        Log::info($request->accepts());
    }
}
