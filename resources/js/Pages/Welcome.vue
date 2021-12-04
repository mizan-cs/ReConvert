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
                            <button class="product-addBtn" :style="'background-color:'+form.button_color+';border-color: '+form.button_color">{{form.button_label}}</button>
                            <button class="product-disableBtn">No Thanks</button>
                        </div>
                    </div>

                </div>

                <!-- Col -->
                <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Welcome to ReConvert!</h3>

                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" @submit.prevent="save_design">
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-bold text-gray-700" for="button_label">
                                Button Label
                            </label>
                            <input
                                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="button_label"
                                v-model="form.button_label"
                                type="text"
                                placeholder="Button Label"
                            />
                            <jet-input-error :message="form.errors.button_label" class="mt-2" />
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-bold text-gray-700" for="button_color">
                                Button Color
                            </label>
                            <input
                                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline h-20"
                                id="button_color"
                                v-model="form.button_color"
                                type="color"
                                placeholder="Button Color"
                            />
                            <jet-input-error :message="form.errors.button_color" class="mt-2" />
                        </div>


                        <div class="mb-6 text-center">
                            <button
                                :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
                                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="submit">Save</button>
                            <jet-action-message :on="form.recentlySuccessful" class="mr-3">
                                Saved.
                            </jet-action-message>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { defineComponent } from 'vue'
    import { Head, Link } from '@inertiajs/inertia-vue3';
    import JetInputError from '@/Jetstream/InputError.vue'
    import JetActionMessage from '@/Jetstream/ActionMessage.vue'

    export default defineComponent({
        components: {
            Head,
            Link,
            JetInputError,
            JetActionMessage
        },

        props: {
            cardDesign: Object,
            errors: Object,
        },
        data(){
            return{
                form: this.$inertia.form({
                    _method: 'POST',
                    button_label:this.cardDesign.button_label,
                    button_color:this.cardDesign.button_color,
                })
            }
        },
        methods:{
            save_design(){
                if (this.form.button_color == null || this.form.button_color.length == ''){
                    this.form.errors.button_color = 'Button color is required'
                    return;
                }

                if (this.form.button_label == null || this.form.button_label.length == ''){
                    this.form.errors.button_label = 'Button label is required'
                    return;
                }

                this.form.post(route('saveDesign'), {
                    errorBag: 'updateDesign',
                    preserveScroll: true,
                    onSuccess: () => this.form.errors,
                });
            }
        }
    })
</script>
<style scoped>
    .designer-box{
        border: solid 1px #e0e0e0;
        border-radius: 9px;
    }
    .modal {
        background-color: rgba(0, 0, 0, 0.507);
        position: fixed;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
    }
    .modal-box {
        width: 430px;
        background-color: rgb(255, 255, 255);
        border-radius: 12px;
        position: relative;
    }
    .modal-wrapper {
        padding: 20px 20px 20px 20px;
    }
    .carousel {
        position: relative;
    }
    .carousel-img {
        width: 100%;
        height: 100%;
        padding: 0px 20px;
    }
    .carousel-img img {
        height: 310px;
        width: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 8px;
    }
    .carousel-leftBtn {
        position: absolute;
        top: 50%;
        left: 0;
    }
    .carousel-rightBtn {
        position: absolute;
        top: 50%;
        right: 0;
    }
    .svg {
        width: 20px;
    }
    .modal-content {
        display: flex;
        flex-direction: column;
        padding: 8px 20px;
        gap: 4px;
    }
    .product-tag {
        font-size: 14px;
        color: rgb(31, 30, 30);
    }
    .product-name {
        font-size: 16px;
        color: rgb(31, 30, 30);
        font-weight: 600;
    }
    .protuct-price-discount {
        font-size: 14px;
        color: rgb(31, 30, 30);
        text-decoration: line-through;
    }
    .protuct-price {
        font-size: 14px;
        color: rgb(31, 30, 30);
        font-weight: 600;
    }
    .product-action {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 20px;
    }
    .product-action-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .product-action-quantity,
    .product-action-size-color {
        width: 48%;
    }
    .lable {
        font-size: 14px;
        color: rgb(31, 30, 30);
        margin-bottom: 4px;
        display: block;
    }
    .quantity-box {
        border: 1px solid gray;
        display: flex;
        border-radius: 4px;
        height: 36px;
        overflow: hidden;
    }
    .product-dic {
        width: 24px;
        flex-shrink: 0;
        text-align: center;
        font-weight: 600;
        border-right: 1px solid gray;
    }
    .quantity-input {
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 14px;
        outline: none;
        border: none;
    }
    .product-inc {
        width: 24px;
        flex-shrink: 0;
        text-align: center;
        font-weight: 600;
        border-left: 1px solid gray;
    }

    .product-size-select,
    .product-color-select {
        width: 100%;
        height: 36px;
        text-align: center;
        font-size: 14px;
        color: rgb(31, 30, 30);

        border-radius: 4px;
        border: 1px solid gray;
        cursor: pointer;
        outline: none;
    }
    .product-buttons {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 20px;
    }

    .product-addBtn,
    .product-disableBtn {
        width: 100%;
        text-align: center;
        color: rgb(255, 255, 255);
        font-size: 14px;
        padding: 8px 0px;
        font-weight: 600;
        border-radius: 4px;
    }
    .product-addBtn {
        background: #000;
    }
    .product-disableBtn {
        background-color: transparent;
        color: gray;
    }
    .btnClose {
        position: absolute;
        top: 8px;
        right: 8px;
    }
    .btnClose svg {
        width: 12px;
    }
    .main-sec {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    .open {
        opacity: 1;
        visibility: visible;
        transition: all 0.4s ease;
    }

    .bg-gray-100 {
        background-color: #f7fafc;
        background-color: rgba(247, 250, 252, var(--tw-bg-opacity));
    }

    .border-gray-200 {
        border-color: #edf2f7;
        border-color: rgba(237, 242, 247, var(--tw-border-opacity));
    }

    .text-gray-400 {
        color: #cbd5e0;
        color: rgba(203, 213, 224, var(--tw-text-opacity));
    }

    .text-gray-500 {
        color: #a0aec0;
        color: rgba(160, 174, 192, var(--tw-text-opacity));
    }

    .text-gray-600 {
        color: #718096;
        color: rgba(113, 128, 150, var(--tw-text-opacity));
    }

    .text-gray-700 {
        color: #4a5568;
        color: rgba(74, 85, 104, var(--tw-text-opacity));
    }

    .text-gray-900 {
        color: #1a202c;
        color: rgba(26, 32, 44, var(--tw-text-opacity));
    }

    @media (prefers-color-scheme: dark) {
        .dark\:bg-gray-800 {
            background-color: #2d3748;
            background-color: rgba(45, 55, 72, var(--tw-bg-opacity));
        }

        .dark\:bg-gray-900 {
            background-color: #1a202c;
            background-color: rgba(26, 32, 44, var(--tw-bg-opacity));
        }

        .dark\:border-gray-700 {
            border-color: #4a5568;
            border-color: rgba(74, 85, 104, var(--tw-border-opacity));
        }

        .dark\:text-white {
            color: #fff;
            color: rgba(255, 255, 255, var(--tw-text-opacity));
        }

        .dark\:text-gray-400 {
            color: #cbd5e0;
            color: rgba(203, 213, 224, var(--tw-text-opacity));
        }
    }
</style>


