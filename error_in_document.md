$$此处记录接口文档返回相应与实际的差异$$
勘误记录时间：2023.08.18
接口文档：https://apifox.com/apidoc/shared-12ab6b18-adc2-444c-ad11-0e60f5693f66/doc-2221080

 `checkout/order`
 <table>
<tr>
<th>实际得到的形式</th>
<th>文档展示的形式</th>
</tr>
<tr>
<td>

```json
{
    "order": {
        "goodsList": [],
        "orderTotalNum": 0,
        "couponList": [],
        "hasError": false,
        "errorMsg": "",
        "delivery": "10",
        "address": null,
        "existAddress": false,
        "expressPrice": "0.00",
        "isIntraRegion": false,
        "isAllowPoints": false,
        "isUsePoints": "0",
        "pointsMoney": 0,
        "pointsBonus": 0,
        "payType": 10,
        "setting": {
            "deliveryType": [
                10
            ],
            "points_name": "积分",
            "points_describe": ""
        },
        "orderTotalPrice": "0.00",
        "couponId": 0,
        "couponMoney": 0,
        "orderPrice": "0.00",
        "orderPayPrice": "0.00"
    },
    "personal": {
        "user_id": 16347,
        "balance": "6666666.00",
        "points": 0,
        "address_id": 0
    },
    "setting": {
        "deliveryType": [
            10
        ],
        "points_name": "积分",
        "points_describe": ""
    }
}
```

</td>
<td>

```json
{
        "orderId": "10027",
        "payType": 10,
        "payment": []
    }
```

</td>
</tr>
</table>