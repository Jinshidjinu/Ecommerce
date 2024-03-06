const hamburgerBtn = document.querySelector(".hamburger");
const mobilenavigationList = document.querySelector(".mobilenavigationList");
const mobilenavigation = document.querySelector(".mobilenavigation");
const logo = document.querySelector(".logo");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobilenavigationList.classList.toggle("active");
  mobilenavigation.classList.toggle("active");
  logo.classList.toggle("active");
});

EditAddressPOST : async (req, res) => {
    try {
        const userID = req.session.email?._id;
        const newAddress = req.body;
        const addressID = req.params.id;
  
        const editAddress = await addressSchema.updateOne(
            // Query: Update the document where the user is the userID and the address has the given ID
            { user: userID, 'address._id': addressID },
            // Update: Set the fields of the address matching the given ID
            {
                $set: {
                    'address.$.Locality': newAddress.locality,
                    'address.$.country': newAddress.country,
                    'address.$.District': newAddress.district,
                    'address.$.state': newAddress.state,
                    'address.$.City': newAddress.city,
                    'address.$.HouseName': newAddress.housename,
                    'address.$.HouseNo': newAddress.hNo,
                    'address.$.pincode': newAddress.pincode
                }
            }
        );
  
        console.log(editAddress);
        res.redirect('/address');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
  }