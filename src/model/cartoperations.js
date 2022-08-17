const connection = require('../Utilities/connections');
let cart={}

cart.putToCart = async (email,product)=>{
    const cartCollection= await connection.getCartCollection()
    let addToCart= await cartCollection.updateOne(
        {"eCredentials.eEmail":email},
        {$addToSet:{"eCart":product}}
    )
    if(addToCart.nModified>0){
        return addToCart
    }else{
        let newAccount = await cartCollection.create({
            "eCredentials":{"eEmail":email},
            "eCart":[product],
        })
        return newAccount
    }
}

cart.getCart = async (email)=>{
    const cartCollection = await connection.getCartCollection()
    let getUserCart=await cartCollection.findOne({"eCredentials.eEmail":email})
    if(getUserCart)
        return getUserCart.eCart
    else
        return null
}

// async function k(){
//     const u=await cart.putToCart("dummy@gmail.com","3214")
//     const x = await cart.getCart("dummy@gmail.com")
//     console.log(u,x)
//     }
//     k()

module.exports=cart