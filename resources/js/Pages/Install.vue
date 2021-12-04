<template>
    <Head title="Welcome" />

    <!-- Container -->
    <div class="container mx-auto">
        <div class="flex justify-center px-6 my-12">
            <!-- Row -->
            <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                <!-- Col -->
                <div class="w-full h-auto bg-white-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg designer-box">
                    <div class="modal-wrapper">
                        <div class="carousel">
                            <div class="carousel-img">
                                <img src="https://i.ibb.co/8cgz4D3/apiceanlr-99415-1631520907-500-750.jpg" alt="" class="">
                            </div>
                            <button class="carousel-leftBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <button class="absolute top-1/2 right-0 carousel-rightBtn">
                                <svg xmlns="http://www.w3.org/2000/svg" class="svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="modal-content">
                            <span class="product-tag">vendor</span>
                            <span class="product-name">Denim jean</span>
                            <div>
                                <span class="protuct-price-discount">$60</span>
                                <span class="protuct-price">$50</span>
                            </div>
                        </div>
                        <div class="product-action">
                            <div class="product-action-wrapper">
                                <div class="product-action-quantity">
                                    <label for="" class="lable"> Quantity</label>

                                    <div class="quantity-box">
                                        <button class="product-dic">-</button>
                                        <input type="text" value="5" class="quantity-input">
                                        <button class="product-inc">+</button>
                                    </div>
                                </div>
                                <div class="product-action-size-color">
                                    <label for="" class="lable">Select size</label>

                                    <select name="" id="" class="product-size-select">
                                        <option value="">M</option>
                                        <option value="">L</option>
                                    </select>
                                </div>
                            </div>
                            <div class="">
                                <label for="" class="lable">Select color</label>
                                <select name="" id="" class="product-color-select">
                                    <option value="">Red</option>
                                    <option value="">Blue</option>
                                </select>
                            </div>
                        </div>
                        <div class="product-buttons">
                            <button class="product-addBtn" style="background-color:black;border-color:black">Your Text Here</button>
                            <button class="product-disableBtn">No Thanks</button>
                        </div>
                    </div>

                </div>

                <!-- Col -->
                <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Welcome to ReConvert!</h3>

                    <div class="mb-6 text-center">
                        <Link href="/install"
                              class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                            Install script to my shop
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Install"
    }
</script>

<style scoped>

</style>
