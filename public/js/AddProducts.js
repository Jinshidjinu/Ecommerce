

const submit = document.querySelector(".buttonsubmit")
const message = document.querySelector(".message")

submit.addEventListener("click",async(data)=> {
    try{
        data.preventDefault(); //submission behaviour

        const addproductForm = document.getElementById('add_product_form')
        const form = new FormData(addproductForm);
        
        const productName = form.get('productName')
        const stock = form.get('stock')
        const prices = form.get('prices')
        const discount = form.get('discount')
        const category = form.get('category')
        const subCategory = form.get('subCategory')
        const deliveryDate = form.get('deliveryDate')
        const description = form.get('description')
        const colour = form.get('colour');
        const size = form.get('size')

      
        const productImageFile = document.getElementById('productImage').files[0]
        console.log(productImageFile);
        
        if(!productName || productName=="" || !prices || !stock || !category || !subCategory || !deliveryDate || !description || !productImageFile){
          message.textContent = "please fill out all fields"
           setTimeout(()=>{
               message.innerHTML = ""
            },2000)
        }else{
            const response = await fetch("/admin/AddProducts",{
                method:"POST",
                body:form
            })
          
            if(!response.ok){
                throw new Error("Error adding product:"+ response.statusText)
            }
            const result = await response.json()

            if (result.success==true) {
                message.innerHTML = "product successfully added";
                message.classList.add("success");
                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 500);
                
            }
            else{
                message.innerHTML = result.error || "unknow error"
            }
        }
       
    } catch (error) {
        console.error("Error adding product:", error);
    }
})




