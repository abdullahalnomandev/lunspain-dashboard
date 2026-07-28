import sidebarItems from "../utils/sidebarItems";

const getNavbatItem = (key: string)=>{
    let keyItem : any = {};
    sidebarItems.find((item) =>{
        if(item.key === key){
            keyItem = item
        }

        else if(item.children){
            
           const childItem = item.children?.find((child) => child.key === key)

           if(childItem){
            keyItem = childItem
           }
           
        }

        return null;
    
    });

    return keyItem;

}

export default getNavbatItem;