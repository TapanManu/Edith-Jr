module.exports = {
    month:function(num){
        const months = ["Jan","Feb","Mar","Apr","May","Jun",
                        "Jul","Aug","Sept","Oct","Nov","Dec"];
        return months[num-1];
    },
    formatTime:function(hrs,min){
        let str="AM";
        if(hrs>=12){
            str="PM";
        }
        else{
            str="AM";
        }
        //console.log(hrs);
        return hrs+":"+min+" "+str;
    },
    computeTime:function(flag){
        const hrs = new Date().getHours();
        //console.log(hrs);
        if(flag===0){       //only for good bye
            if((hrs>=20 && hrs<=24) || (hrs>=0 && hrs<=4)){
                return "good night";
            }
        }
        else if(hrs>=5 && hrs<12){
            return "good morning";
        }
        else if(hrs>=12 && hrs<16){
            return "good afternoon";
        }
        else
            return "good evening";   
    }
};