//変数宣言
let area, volume, price, cost, unVolume, allCost;

// 四捨五入　関数
function point(num, digit) {
    const mover =10 ** digit;
    return Math.floor(num * mover) / mover;
};

// 総工費計算　関数
function calculateCost(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    area = form.area.value;
    volume = form.volume.value/100; //%を倍数に変換
    unVolume = document.getElementById("unVolume").value;
    price = form.price.value;
    cost = area*0.3025*volume*price*unVolume;
    allCost = cost*1.15 + 2000;
    document.getElementById("cost").textContent = `建築費：${point(cost, 0)}万円`;
    document.getElementById("allCost").textContent = `総工費：${point(allCost, 0)}万円`;
};

//　税金計算(簡易)　関数
function calTax(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const area = form.area.value;
    const price = form.price.value;
    const realTax = form.realTax.value;
    const floor = form.floor.value*0.3025;
    const realValue = area*realTax;
    const realPay = realValue*0.017;
    const builValue = floor*price*0.7;
    const builPay = builValue*0.017;
    const taxPay = realPay+builPay;

    document.getElementById("realValue").textContent = `固定資産税評価額(土地)：${point(realValue, 0)}万円`;
    document.getElementById("realPay").textContent = `年間固都税支払い額(土地)：${point(realPay, 0)}万円`;
    document.getElementById("builValue").textContent = `固定資産税評価額(建物)：${point(builValue, 0)}万円`;
    document.getElementById("builPay").textContent = `年間固都税支払い額(建物)：${point(builPay, 0)}万円`;
    document.getElementById("taxPay").textContent = `合計固都税支払い額：${point(taxPay, 0)}万円`;
};

//　税金計算　関数
function calculateTax(event) {
    let realPay, builPay;
    event.preventDefault();
    const form = document.getElementById("form");
    const area = form.area.value;
    const realTax = form.realTax.value;
    const purpose = document.getElementById("purpose").value;
    const house = form.house.value;
    const floor = form.floor.value*0.3025;
    const price = form.price.value;
    const structure = document.getElementById("structure").value;
    const year = document.getElementById("year").value;

    //土地の税金計算
    if (realTax && area) {
        let propertyValue = realTax * area;
        let propertyCityValue = realTax * area;
        
        if (purpose === 'housing') {
            // 小規模住宅用地の特例を適用
            const specialArea = Math.min(area, 200*house);  // 200m²×戸数まで適用
            const remainingArea = Math.max(area - 200*house, 0);
            const specialValue = realTax * specialArea / 6;  // 評価額を1/6に減額
            const normalValue = realTax * remainingArea / 3;
            propertyValue = specialValue + normalValue;
            const specialCityArea = Math.min(area, 200*house);  // 200m²×戸数まで適用
            const remainingCityArea = Math.max(area - 200*house, 0);
            const specialCityValue = realTax * specialArea / 3;  // 評価額を1/6に減額
            const normalCityValue = realTax * remainingArea * 2 / 3;
            propertyCityValue = specialCityValue + normalCityValue;
        };

        realPay = propertyValue*0.014 + propertyCityValue*0.003;

        document.getElementById("realValue").textContent = `固定資産税評価額(土地)：${point(propertyValue, 0)}万円`;
        document.getElementById("realPay").textContent = `年間固都税支払い額(土地)：${point(realPay, 0)}万円`;
        };
        //建物の税金計算
        if (floor && price) {
            let builValue = floor*price

            const rate = {
              wood: [0.8, 0.75, 0.7, 0.67, 0.64, 0.62, 0.59, 0.56, 0.53, 0.5, 0.48, 0.45, 0.42, 0.39, 0.37, 0.34, 0.32, 0.3, 0.28, 0.25, 0.24, 0.24, 0.23, 0.22, 0.21, 0.21, 0.2],
              unWood: [0.9579, 0.9309, 0.9038, 0.8803, 0.8569, 0.8335, 0.8100, 0.7866, 0.7632, 0.7397, 0.7163, 0.6929, 0.6695, 0.6460, 0.6225, 0.5992, 0.5757, 0.5523, 0.5288, 0.5054, 0.4820, 0.4585, 0.4388, 0.4189, 0.3992, 0.3794, 0.3596, 0.3398, 0.3228, 0.3059, 0.2916, 0.2774, 0.2631, 0.2488, 0.2345, 0.2294, 0.2243, 0.2191, 0.2140, 0.2089, 0.2071, 0.2053, 0.2036, 0.2018, 0.2000]
            };
            
            const realRate = rate[structure][year-1];
            builValue *= realRate;

            builPay = builValue*0.017;

          document.getElementById("builValue").textContent = `固定資産税評価額(建物)：${point(builValue, 0)}万円`;
          document.getElementById("builPay").textContent = `年間固都税支払い額(建物)：${point(builPay, 0)}万円`;
        };
        //合計値の計算
        const taxPay = realPay + builPay;
        document.getElementById("taxPay").textContent = `合計固都税支払い額：${point(taxPay, 0)}万円`;
};

//相続税計算(簡易)　関数
function calInheritanceTax(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const area = form.area.value;
    const inheritanceTax = form.inheritanceTax.value;
    const inheritanceValue = area*inheritanceTax;
    document.getElementById("inheritanceValue").textContent = `相続税評価額：${point(inheritanceValue, 0)}万円`;
};

// 相続税計算　関数
function calculateInheritanceTax(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const area = form.area.value;
    const inheritanceTax = form.inheritanceTax.value;
    const heir = form.heir.value;
    const category = document.getElementById("category").value;

    let inheritanceValue = inheritanceTax*area;

    //小規模宅地の特例
    if (category === 'residential') {
        let specialArea = Math.min(area, 330);  // 330m²まで適用
        let normalArea = Math.max(area - 330, 0);
        let specialValue = inheritanceTax * specialArea *0.2;  // 評価額を80%減
        let normalValue = inheritanceTax * normalArea;
        inheritanceValue = specialValue + normalValue;
    } else if (category === "business") {
        specialArea = Math.min(area, 400);  // 400m²まで適用
        normalArea = Math.max(area - 400, 0);
        specialValue = inheritanceTax * specialArea *0.2;  // 評価額を80%減
        normalValue = inheritanceTax * normalArea;
        inheritanceValue = specialValue + normalValue;
    } else if (category === "loanBusiness") {
        specialArea = Math.min(area, 200);  // 200m²まで適用
        normalArea = Math.max(area - 200, 0);
        specialValue = inheritanceTax * specialArea *0.5;  // 評価額を50%減
        normalValue = inheritanceTax * normalArea;
        inheritanceValue = specialValue + normalValue;
    };

    //基礎控除後の課税遺産総額
    const inheritanceTaxable = inheritanceValue - (3000+600*heir);

    if (inheritanceTaxable > 0) {
        document.getElementById("inheritanceTaxable").textContent = `課税遺産総額：${point(inheritanceTaxable, 0)}万円`;
    } else {
        document.getElementById("inheritanceTaxable").textContent = "課税遺産総額：0万円";
    };

    document.getElementById("inheritanceValue").textContent = `相続税評価額：${point(inheritanceValue, 0)}万円`;

};

// 収益計算(簡易)　関数
function calProfit(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const rent = form.rent.value;
    const repayment = allCost*0.003;
    const leftoversMonth = ((rent*area*volume/10000) - repayment);
    const leftovers = leftoversMonth * 12;
    const yield = leftovers/allCost*100;
    document.getElementById("leftovers").textContent = `手残り(年):${point(leftovers, 0)}万円`;
    document.getElementById("leftoversMonth").textContent = `手残り(月):${point(leftoversMonth, 0)}万円`;
    document.getElementById("yield").textContent = `実質利回り：${point(yield, 2)}%`;
};

//収益計算　関数
function calculateProfit(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const rent = form.rent.value;
    const fund = form.fund.value;
    const debt = allCost - fund;
    const monthRate = form.rate.value/1200;
    const debtMonth = form.debtYear.value*12;
    const income = area*volume*rent/10000*12;
    const monthRepayment = (debt*monthRate*(1+monthRate)**debtMonth)/((1+monthRate)**debtMonth-1);
    const repayment = monthRepayment*12;
    //土地の税金計算
    const realTax = form.realTax.value;
    const houseArea = area*volume/30;

    let propertyValue = realTax * area;
    let propertyCityValue = realTax * area;

    const specialArea = Math.min(area, 200*houseArea);  // 200m²×戸数まで適用
    const normalArea = Math.max(area - 200*houseArea, 0);
    const specialValue = realTax * specialArea / 6;  // 評価額を1/6に減額
    const normalValue = realTax * normalArea / 3;
    propertyValue = specialValue + normalValue;
    const specialCityArea = Math.min(area, 200*houseArea);  // 200m²×戸数まで適用
    const normalCityArea = Math.max(area - 200*houseArea, 0);
    const specialCityValue = realTax * specialArea / 3;  // 評価額を1/6に減額
    const normalCityValue = realTax * normalCityArea * 2 / 3;
    propertyCityValue = specialCityValue + normalCityValue;

    const realPay = propertyValue*0.014 + propertyCityValue*0.003;
    //建物の税金計算
    const structure = document.getElementById("structure").value;
    let builValuation = (allCost/1.15)-2000;
    const rate = {
      wood: [0.8, 0.75, 0.7, 0.67, 0.64, 0.62, 0.59, 0.56, 0.53, 0.5, 0.48, 0.45, 0.42, 0.39, 0.37, 0.34, 0.32, 0.3, 0.28, 0.25, 0.24, 0.24, 0.23, 0.22, 0.21, 0.21, 0.2],
      unWood: [0.9579, 0.9309, 0.9038, 0.8803, 0.8569, 0.8335, 0.8100, 0.7866, 0.7632, 0.7397, 0.7163, 0.6929, 0.6695, 0.6460, 0.6225, 0.5992, 0.5757, 0.5523, 0.5288, 0.5054, 0.4820, 0.4585, 0.4388, 0.4189, 0.3992, 0.3794, 0.3596, 0.3398, 0.3228, 0.3059, 0.2916, 0.2774, 0.2631, 0.2488, 0.2345, 0.2294, 0.2243, 0.2191, 0.2140, 0.2089, 0.2071, 0.2053, 0.2036, 0.2018, 0.2000]
    };
    const realRate = rate[structure][0];
    builValuation *= realRate;
    const specialBuilValuation = builValuation/2;
  
    const builPay = specialBuilValuation*0.014+builValuation*0.003;
  
    const taxPay =realPay + builPay;

    const leftover = income - repayment - taxPay;
    const leftoversMonth = (income - repayment - taxPay) / 12 ;
    const yield = (leftover/allCost)*100;

    document.getElementById("income").textContent = `総収入：${point(income, 0)}万円`;
    document.getElementById("repayment").textContent = `初年度返済額：${point(repayment, 0)}万円`;
    document.getElementById("taxPay").textContent = `初年度固都税合計額：${point(taxPay, 0)}万円`;
    document.getElementById("leftovers").textContent = `手残り(年)：${point(leftover, 0)}万円`;
    document.getElementById("leftoversMonth").textContent = `手残り(月)：${point(leftoversMonth, 1)}万円`;
    document.getElementById("yield").textContent = `実質利回り：${point(yield, 2)}%`;
};