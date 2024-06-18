class Card {
    constructor(title, subtitle, description, phone, email, imgurl, imgalt, state, country, city, street, houseNumber, zip) {
        this.title = title;
        this.subtitle = subtitle;
        this.description = description;
        this.phone = phone;
        this.email = email;
        this.imgurl = imgurl;
        this.imgalt = imgalt;
        this.state = state;
        this.country = country;
        this.city = city;
        this.street = street;
        this.houseNumber = houseNumber;
        this.zip = zip;
        this.isLiked = false;
    }
    getadress() {
        return this.street.concat(this.houseNumber, this.city)
    }
}

export default Card