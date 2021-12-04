### App user instructions

Add this line to the product page (product-template.liquid): 

```html
    <script>
        currentProduct = {{ product | json }};
    </script>
```

Also add a element to "Add to cart button":
```
id="add-to-cart-button-th"

// Example:
<button 
    type="submit" 
    name="add"
    product="{{ product }}"
    id="add-to-cart-button-th">
                  .....
                  ....
</button> 
```


>Developer: Mizanur Rahman
> 
> Email: mizan.dimik@gmail.com
