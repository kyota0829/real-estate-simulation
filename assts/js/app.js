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

// 市区町村選択　関数
const municipalities = {
    11: [
        { value: '11101', name: 'さいたま市西区' },
        { value: '11102', name: 'さいたま市北区' },
        { value: '11103', name: 'さいたま市大宮区' },
        { value: '11104', name: 'さいたま市見沼区' },
        { value: '11105', name: 'さいたま市中央区' },
        { value: '11106', name: 'さいたま市桜区' },
        { value: '11107', name: 'さいたま市浦和区' },
        { value: '11108', name: 'さいたま市南区' },
        { value: '11109', name: 'さいたま市緑区' },
        { value: '11110', name: 'さいたま市岩槻区' },
        { value: '11201', name: '川越市' },
        { value: '11202', name: '熊谷市' },
        { value: '11203', name: '川口市' },
        { value: '11206', name: '行田市' },
        { value: '11207', name: '秩父市' },
        { value: '11208', name: '所沢市' },
        { value: '11209', name: '飯能市' },
        { value: '11210', name: '加須市' },
        { value: '11211', name: '本庄市' },
        { value: '11212', name: '東松山市' },
        { value: '11214', name: '春日部市' },
        { value: '11215', name: '狭山市' },
        { value: '11216', name: '羽生市' },
        { value: '11217', name: '鴻巣市' },
        { value: '11218', name: '深谷市' },
        { value: '11219', name: '上尾市' },
        { value: '11221', name: '草加市' },
        { value: '11222', name: '越谷市' },
        { value: '11223', name: '蕨市' },
        { value: '11224', name: '戸田市' },
        { value: '11225', name: '入間市' },
        { value: '11226', name: '鳩ヶ谷市' },
        { value: '11227', name: '朝霞市' },
        { value: '11228', name: '志木市' },
        { value: '11229', name: '和光市' },
        { value: '11230', name: '新座市' },
        { value: '11231', name: '桶川市' },
        { value: '11232', name: '久喜市' },
        { value: '11233', name: '北本市' },
        { value: '11234', name: '八潮市' },
        { value: '11235', name: '富士見市' },
        { value: '11237', name: '三郷市' },
        { value: '11238', name: '蓮田市' },
        { value: '11239', name: '坂戸市' },
        { value: '11240', name: '幸手市' },
        { value: '11241', name: '鶴ケ島市' },
        { value: '11242', name: '日高市' },
        { value: '11243', name: '吉川市' },
        { value: '11245', name: 'ふじみ野市' },
        { value: '11246', name: '白岡市' },
        { value: '11301', name: '伊奈町' },
        { value: '11324', name: '三芳町' },
        { value: '11326', name: '毛呂山町' },
        { value: '11327', name: '越生町' },
        { value: '11341', name: '滑川町' },
        { value: '11342', name: '嵐山町' },
        { value: '11343', name: '小川町' },
        { value: '11346', name: '川島町' },
        { value: '11347', name: '吉見町' },
        { value: '11348', name: '鳩山町' },
        { value: '11349', name: 'ときがわ町' },
        { value: '11361', name: '横瀬町' },
        { value: '11362', name: '皆野町' },
        { value: '11363', name: '長瀞町' },
        { value: '11365', name: '小鹿野町' },
        { value: '11369', name: '東秩父村' },
        { value: '11381', name: '美里町' },
        { value: '11383', name: '神川町' },
        { value: '11385', name: '上里町' },
        { value: '11408', name: '寄居町' },
        { value: '11442', name: '宮代町' },
        { value: '11464', name: '杉戸町' },
        { value: '11465', name: '松伏町' }
    ],
    12: [
        { value: '12101', name: '千葉市中央区' },
        { value: '12102', name: '千葉市花見川区' },
        { value: '12103', name: '千葉市稲毛区' },
        { value: '12104', name: '千葉市若葉区' },
        { value: '12105', name: '千葉市緑区' },
        { value: '12106', name: '千葉市美浜区' },
        { value: '12202', name: '銚子市' },
        { value: '12203', name: '市川市' },
        { value: '12204', name: '船橋市' },
        { value: '12205', name: '館山市' },
        { value: '12206', name: '木更津市' },
        { value: '12207', name: '松戸市' },
        { value: '12208', name: '野田市' },
        { value: '12210', name: '茂原市' },
        { value: '12211', name: '成田市' },
        { value: '12212', name: '佐倉市' },
        { value: '12213', name: '東金市' },
        { value: '12215', name: '旭市' },
        { value: '12216', name: '習志野市' },
        { value: '12217', name: '柏市' },
        { value: '12218', name: '勝浦市' },
        { value: '12219', name: '市原市' },
        { value: '12220', name: '流山市' },
        { value: '12221', name: '八千代市' },
        { value: '12222', name: '我孫子市' },
        { value: '12223', name: '鴨川市' },
        { value: '12224', name: '鎌ケ谷市' },
        { value: '12225', name: '君津市' },
        { value: '12226', name: '富津市' },
        { value: '12227', name: '浦安市' },
        { value: '12228', name: '四街道市' },
        { value: '12229', name: '袖ケ浦市' },
        { value: '12230', name: '八街市' },
        { value: '12231', name: '印西市' },
        { value: '12232', name: '白井市' },
        { value: '12233', name: '富里市' },
        { value: '12234', name: '南房総市' },
        { value: '12235', name: '匝瑳市' },
        { value: '12236', name: '香取市' },
        { value: '12237', name: '山武市' },
        { value: '12238', name: 'いすみ市' },
        { value: '12239', name: '大網白里市' },
        { value: '12322', name: '酒々井町' },
        { value: '12329', name: '栄町' },
        { value: '12342', name: '神崎町' },
        { value: '12347', name: '多古町' },
        { value: '12349', name: '東庄町' },
        { value: '12403', name: '九十九里町' },
        { value: '12409', name: '芝山町' },
        { value: '12410', name: '横芝光町' },
        { value: '12421', name: '一宮町' },
        { value: '12422', name: '睦沢町' },
        { value: '12423', name: '長生村' },
        { value: '12424', name: '白子町' },
        { value: '12426', name: '長柄町' },
        { value: '12427', name: '長南町' },
        { value: '12441', name: '大多喜町' },
        { value: '12443', name: '御宿町' },
        { value: '12463', name: '鋸南町' }
    ],
    13: [
        { value: '13101', name: '千代田区' },
        { value: '13102', name: '中央区' },
        { value: '13103', name: '港区' },
        { value: '13104', name: '新宿区' },
        { value: '13105', name: '文京区' },
        { value: '13106', name: '台東区' },
        { value: '13107', name: '墨田区' },
        { value: '13108', name: '江東区' },
        { value: '13109', name: '品川区' },
        { value: '13110', name: '目黒区' },
        { value: '13111', name: '大田区' },
        { value: '13112', name: '世田谷区' },
        { value: '13113', name: '渋谷区' },
        { value: '13114', name: '中野区' },
        { value: '13115', name: '杉並区' },
        { value: '13116', name: '豊島区' },
        { value: '13117', name: '北区' },
        { value: '13118', name: '荒川区' },
        { value: '13119', name: '板橋区' },
        { value: '13120', name: '練馬区' },
        { value: '13121', name: '足立区' },
        { value: '13122', name: '葛飾区' },
        { value: '13123', name: '江戸川区' },
        { value: '13201', name: '八王子市' },
        { value: '13202', name: '立川市' },
        { value: '13203', name: '武蔵野市' },
        { value: '13204', name: '三鷹市' },
        { value: '13205', name: '青梅市' },
        { value: '13206', name: '府中市' },
        { value: '13207', name: '昭島市' },
        { value: '13208', name: '調布市' },
        { value: '13209', name: '町田市' },
        { value: '13210', name: '小金井市' },
        { value: '13211', name: '小平市' },
        { value: '13212', name: '日野市' },
        { value: '13213', name: '東村山市' },
        { value: '13214', name: '国分寺市' },
        { value: '13215', name: '国立市' },
        { value: '13218', name: '福生市' },
        { value: '13219', name: '狛江市' },
        { value: '13220', name: '東大和市' },
        { value: '13221', name: '清瀬市' },
        { value: '13222', name: '東久留米市' },
        { value: '13223', name: '武蔵村山市' },
        { value: '13224', name: '多摩市' },
        { value: '13225', name: '稲城市' },
        { value: '13227', name: '羽村市' },
        { value: '13228', name: 'あきる野市' },
        { value: '13229', name: '西東京市' },
        { value: '13303', name: '瑞穂町' },
        { value: '13305', name: '日の出町' },
        { value: '13307', name: '檜原村' },
        { value: '13308', name: '奥多摩町' },
        { value: '13361', name: '大島町' },
        { value: '13362', name: '利島村' },
        { value: '13363', name: '新島村' },
        { value: '13364', name: '神津島村' },
        { value: '13381', name: '三宅村' },
        { value: '13382', name: '御蔵島村' },
        { value: '13401', name: '八丈町' },
        { value: '13402', name: '青ヶ島村' },
        { value: '13421', name: '小笠原村' }
    ],
    14: [
        { value: '14101', name: '横浜市鶴見区' },
        { value: '14102', name: '横浜市神奈川区' },
        { value: '14103', name: '横浜市西区' },
        { value: '14104', name: '横浜市中区' },
        { value: '14105', name: '横浜市南区' },
        { value: '14106', name: '横浜市保土ケ谷区' },
        { value: '14107', name: '横浜市磯子区' },
        { value: '14108', name: '横浜市金沢区' },
        { value: '14109', name: '横浜市港北区' },
        { value: '14110', name: '横浜市戸塚区' },
        { value: '14111', name: '横浜市港南区' },
        { value: '14112', name: '横浜市旭区' },
        { value: '14113', name: '横浜市緑区' },
        { value: '14114', name: '横浜市瀬谷区' },
        { value: '14115', name: '横浜市栄区' },
        { value: '14116', name: '横浜市泉区' },
        { value: '14117', name: '横浜市青葉区' },
        { value: '14118', name: '横浜市都筑区' },
        { value: '14131', name: '川崎市川崎区' },
        { value: '14132', name: '川崎市幸区' },
        { value: '14133', name: '川崎市中原区' },
        { value: '14134', name: '川崎市高津区' },
        { value: '14135', name: '川崎市多摩区' },
        { value: '14136', name: '川崎市宮前区' },
        { value: '14137', name: '川崎市麻生区' },
        { value: '14151', name: '相模原市緑区' },
        { value: '14152', name: '相模原市中央区' },
        { value: '14153', name: '相模原市南区' },
        { value: '14201', name: '横須賀市' },
        { value: '14203', name: '平塚市' },
        { value: '14204', name: '鎌倉市' },
        { value: '14205', name: '藤沢市' },
        { value: '14206', name: '小田原市' },
        { value: '14207', name: '茅ヶ崎市' },
        { value: '14208', name: '逗子市' },
        { value: '14210', name: '三浦市' },
        { value: '14211', name: '秦野市' },
        { value: '14212', name: '厚木市' },
        { value: '14213', name: '大和市' },
        { value: '14214', name: '伊勢原市' },
        { value: '14215', name: '海老名市' },
        { value: '14216', name: '座間市' },
        { value: '14217', name: '南足柄市' },
        { value: '14218', name: '綾瀬市' },
        { value: '14301', name: '葉山町' },
        { value: '14321', name: '寒川町' },
        { value: '14341', name: '大磯町' },
        { value: '14342', name: '二宮町' },
        { value: '14361', name: '中井町' },
        { value: '14362', name: '大井町' },
        { value: '14363', name: '松田町' },
        { value: '14364', name: '山北町' },
        { value: '14366', name: '開成町' },
        { value: '14382', name: '箱根町' },
        { value: '14383', name: '真鶴町' },
        { value: '14384', name: '湯河原町' },
        { value: '14401', name: '愛川町' },
        { value: '14402', name: '清川村' }
    ]
};

document.getElementById('prefectures').addEventListener('change', function() {
    const selectedPrefecture = this.value;
    const cityInput = document.getElementById('city');

    cityInput.innerHTML = '<option value="">市区町村を選択してください</option>';

    if(selectedPrefecture && municipalities[selectedPrefecture]) {
        municipalities[selectedPrefecture].forEach(function(municipality) {
            const option = document.createElement('option');
            option.value = municipality.value;
            option.textContent = municipality.name;
            cityInput.appendChild(option);
        });
    }
});

// 期間選択　関数
const startYearSelect = document.getElementById('startYear');
const endYearSelect = document.getElementById('endYear');
const currentYear = new Date().getFullYear();

for (let year = 2005; year <= currentYear; year++) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = year;
    option1.textContent = option2.textContent = year;
    startYearSelect.appendChild(option1);
    endYearSelect.appendChild(option2);
}

// 計測ボタン後のAPIリクエスト　関数
// 条件取得
document.getElementById('measurement').addEventListener('click', async function() {
    const prefectures = document.getElementById('prefectures').value;
    const city = document.getElementById('city').value;
    let startYear = parseInt(document.getElementById('startYear').value, 10);
    let endYear = parseInt(document.getElementById('endYear').value, 10);
    const filter = document.getElementById('filter').value;
    const priceClassification = document.getElementById('priceClassification').checked;

    if(isNaN(startYear)) {
        startYear = 2005;
    }
    if(isNaN(endYear)) {
        endYear = currentYear;
    }

    if(endYear < startYear) {
        alert("終了年は開始年より後にしてください。")
        return;
    }

// APIリクエスト
let results = '';
let totalArea = 0;
let totalTradePrice = 0;

try {
    for (let year = startYear; year <= endYear; year++) {
        let apiUrl = `http://localhost:3001/api?area=${prefectures}&year=${year}&city=${city}`;
        if (priceClassification) {
            apiUrl += '&priceClassification=02';
        }

        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        let filteredData = data.data.data.filter(item => item.Type.includes("宅地"));

        if (filter === "commercial") {
            filteredData = filteredData.filter(item => item.CityPlanning && item.CityPlanning.includes("商業"));
        } else if (filter === "uncommercial") {
            filteredData = filteredData.filter(item => item.CityPlanning && !item.CityPlanning.includes("商業"));
        }

        // リクエストしたデータから平均値を計算

        let yearArea = 0;
        let yearTradePrice = 0;
        filteredData.forEach(item => {
            const areaValue = parseFloat(item.Area);
            const tradePrice = parseFloat(item.TradePrice);
            if (!isNaN(areaValue) && !isNaN(tradePrice)) {
                yearArea += areaValue;
                yearTradePrice += tradePrice;
            }
        });

        if (yearArea > 0) {
            const averagePrice = yearTradePrice / (yearArea * 0.3025);
            results += `${year}年:${averagePrice.toFixed(2)} 円/坪<br>`
        } else {
            results += `${year}年:該当するデータがありません<br>`;
        }
    }

    // 結果を出力
    document.getElementById("averageTradePrice").innerHTML = results;
} catch (error) {
    console.error('Error fetchin data', error);
    document.getElementById("averageTradePrice").innerHTML = "データの取得に失敗しました";
}
});