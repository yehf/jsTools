/**
 * @desc 计算浮点数的加减乘除法--解决计算精度失精问题
 * @param number1
 * @param number2
 * @returns {Number}
 */
var floatCountMethod = function(){

    // 判断当前数值是否是整数
    function isInteger(num) {
        return Math.floor(num) === num;
    }

    // 浮点整数化：2.5 -> 25e-1; 倍数：10
    function floatToIntegerObj(floatNumber) {
        var retObj = {intNumber: 0, multiple: 1}; // 返回的整数值与倍数值
        if(isInteger(floatNumber)) {
            retObj.intNumber = floatNumber;
            return retObj;
        }

        var numStr = floatNumber + "";
        var decimal_len = numStr.substr(numStr.indexOf(".")+1).length;
        retObj.multiple = Math.pow(10,decimal_len);
        retObj.intNumber = Number(numStr.replace(".",""));
        return retObj;
    }

    function countMethod(number1, number2, digits, method) {
        var intObj1 = floatToIntegerObj(number1), // 参数number1整数化后返回对象
            intObj2 = floatToIntegerObj(number2), // 参数number2整数化后返回对象
            intObjNum1 = intObj1.intNumber, // 参数number1整数化后返回整数值
            intObjNum2 = intObj2.intNumber, // 参数number2整数化后返回整数值
            intObjMultiple1 = intObj1.multiple, // 参数number1整数化后返回倍数值
            intObjMultiple2 = intObj2.multiple; // 参数number2整数化后返回倍数值

        // multipleVal 取小数位大的值
        var result = null, multipleVal = intObjMultiple1 > intObjMultiple2 ? intObjMultiple1 : intObjMultiple2;
        if(method === "add") {
            if(intObjMultiple1 === intObjMultiple2) {
                result = intObjNum1 + intObjNum2;
            } else if(intObjMultiple1 > intObjMultiple2) {
                result = intObjNum1 + intObjNum2 * (intObjMultiple1 / intObjMultiple2);
            } else {
                result = intObjNum1 * (intObjMultiple2 / intObjMultiple1) + intObjNum2;
            }
            return digits > 0 ? Number((result / multipleVal).toFixed(digits)) : (result / multipleVal);
        }

        if(method === "subtract") {
            if (intObjMultiple1 === intObjMultiple2) {
                result = intObjNum1 - intObjNum2;
            } else if (intObjMultiple1 > intObjMultiple2) {
                result = intObjNum1 - intObjNum2 * (intObjMultiple1 / intObjMultiple2);
            } else {
                result = intObjNum1 * (intObjMultiple2 / intObjMultiple1) - intObjNum2;
            }
            return digits > 0 ? Number((result / multipleVal).toFixed(digits)) : (result / multipleVal);
        }

        if(method === "multiply") {
            result = (intObjNum1 * intObjNum2) / (intObjMultiple1 * intObjMultiple2);
            return digits > 0 ? Number(result.toFixed(digits)) : result;
        }

        if(method === "divide") {
            result = (intObjNum1 / intObjNum2) * (intObjMultiple2 / intObjMultiple1);
            return digits > 0 ? Number(result.toFixed(digits)) : result;
        }
    }

    // 加
    function add(number1, number2, digits) {
        return countMethod(number1, number2, digits, 'add')
    }
    // 减
    function subtract(number1, number2, digits) {
        return countMethod(number1, number2, digits, 'subtract')
    }
    // 乘
    function multiply(number1, number2, digits) {
        return countMethod(number1, number2, digits, 'multiply')
    }
    // 除
    function divide(number1, number2, digits) {
        return countMethod(number1, number2, digits, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}

module.exports = floatCountMethod;