function gcf(array){
    if(array.length==0){
        return 0
    }
    if(array.length==1){
        return array[0]
    }
    if(array.length>2){
        let a1=array.shift()
        let a2=array.shift()
        let a3=array.shift()
        return gcf([gcf([a1,a2]),a3])
    }
    let gcd=1
    aArray=factors(array[0])
    bArray=factors(array[1])
    for (let i = 0; i < aArray.length; i++) {
        for (let j = 0; j < bArray.length; j++) {
            if(aArray[i]==bArray[j]){
                gcd=aArray[i]
            }
        }
    }
    if(array[0]<0&&array[1]<0){
        gcd*=-1
    }
    return gcd
}

function isPrime(num){
    if(Math.floor(num)!=num){
        return isPrime(Math.floor(num))
    }
    if(isNaN(num)){
        return false
    }
    if(num<0){
        return isPrime(-num)
    }
    if(num==0||num==1){
      return false
    }
    if(isNaN(num)){
      return false
    }else{
      for (let i = 2; i < num; i++) {
        if(num%i==0){
          return false
        }
      }
      return true
    }
  }

function factors(num){
    if(num==0){
        return([0])
    }
    if(num<0){
        return factors(-num)
    }
    let a=[]
    for (let i = 1; i <= num; i++) {
        if(num%i==0){
            a.push(i)
        }
    }
    return a
}

function medianFactors(num){
    let array=factors(num)
    i=Math.floor(array.length/2)
    return [array[i],array[array.length-1-i]]
}

function primeFactor(num){
    return primeFactorRec([num])
}

function primeFactorRec(array){
    if(array.length==1){
        if(isPrime(array[0])){
            return [array[0]]
        }else{
            array=medianFactors(array[0])
        }
    }
    if(!arrayPrime(array)){
        for (let i = 0; i < array.length; i++) {
            if(!isPrime(array[i])){
                array=addAll(array,medianFactors(array[i]))
                array.splice(i,1)
            }
        }
        return primeFactorRec(array)
    }
    return quickSort(array,0,array.length-1)
}

function quickSort(array, start, end) {
	if(array.length<=1){
		return array
	}
	return partition(array,start,end)
}

function partition(array, start, end) {
	let pivot=array[Math.floor((start+end)/2)]
	let leftArray=[]
	let middleArray=[]
	let rightArray=[]
	for (let i = 0; i < array.length; i++) {
		if(array[i]<pivot){
			leftArray.push(array[i])
		}
		if(array[i]==pivot){
			middleArray.push(array[i])
		}
		if(array[i]>pivot){
			rightArray.push(array[i])
		}
	}
	return quickSort(leftArray,0,leftArray.length-1).concat(middleArray,quickSort(rightArray,0,rightArray.length-1))
}

function arrayPrime(array){
    for (let i = 0; i < array.length; i++) {
        if(!isPrime(array[i])){
            return false
        }
    }
    return true
}

function addAll(addTo,addFrom){
    for (let i = 0; i < addFrom.length; i++) {
        addTo.push(addFrom[i])
    }
    return addTo
}

function checkNum(array,num){
    let count=0
    for (let i = 0; i < array.length; i++) {
        if(array[i]==num){
            count++
        }
    }
    return count
}

function primeFactorDisplay(num){
    let array=primeFactor(num)
    let prime=[]
    let current=array[0]
    let count=1
    for (let i = 1; i < array.length; i++) {
        if(array[i]==current){
            count++
        }else{
            prime.push(current,count)
            current=array[i]
            count=1
        }
    }
    prime.push(current,count)
    let string=num + " = "
    for (let i = 0; i < prime.length; i+=2) {
        if(prime[i+1]!=1){
            string+=`${prime[i]}<sup>${prime[i+1]}</sup>`
        }else{
            string+=`${prime[i]}`
        }
        if(i+2<prime.length){
            string+="⋅"
        }
    }
    return string
}

function display(){
    document.getElementById("container").innerHTML=primeFactorDisplay(document.getElementById("input").value)
}