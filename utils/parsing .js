attributes = ["days","start_time","end_time","userId"];
operators = ["&","||","==", "!="];
//check_operators = ["==","!="];
import {agrregationObject} from ""
const syntax_check = (e)=>{

}
const evaluate  = (postfix)=>{
    const stack  = [];
    const p = -1;
    const tokens = postfix.split(" ");
     const n = tokens.length();
     const i = 0;
     for(i = 0;i<n;i++)
    {

        if(operators.find(tokens[i]) == true)
            {
                if(p>=1)
                    {
                          const val1  = stack[p];
                          p--;
                          const val2 = stack[p];
                          p--;
                          //if(val1 == "true")


                           
                    }
            }
    }
    

}
