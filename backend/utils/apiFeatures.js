class ApiFeatures{
    constructor(query,queryString){
        this.query=query
        this.queryString=queryString
    }
    search(){
        const keyword = this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options:"i"
            }

        }:{}
        this.query=this.query.find({...keyword})
        return this
    }
    filter(){
        const queryStrCopty = {...this.queryString}
        
        // Remove some fields from category
        const removeFields=["page","keyword","limit"]
        removeFields.forEach(key=>delete queryStrCopty[key])
 
        //filter for price and rateings

        let queryStr= JSON.stringify(queryStrCopty)
        queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(Items_no_per_page){
        console.log(this.queryString)
        const currentPage = Number(this.queryString.page) || 1;
        const skipItem = Items_no_per_page * (currentPage-1)
         this.query = this.query.limit(Items_no_per_page).skip(skipItem)
         return this;

    }
}
module.exports=ApiFeatures