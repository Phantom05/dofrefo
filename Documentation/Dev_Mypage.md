## Front-end Mypage Support

<i> jsp 기반이고 부트스트랩으로 이미 많이 진행 되있어서, jQuery lib를 사용, 개인 로컬에서 gulp로 컴파일 하여 es2015 자바스크립트 적용, scss 사용하여 페이지별 컴포넌트 적용, js, scss 모두 트렌스 파일화 하여 min 파일로 진행하려 했으나, 일단 버전만 다운하여 js, css 컴파일을 진행하여 파일 전달하는 형식으로 진행.  간단한 기능과 퍼블리싱만 요청하였고, 데이터 전송에 대한 부분은 처리하지 않아도 된다고함, 백엔드 개발자가 jsp로 컨트롤 한다고함.</i>

## process

## 1. View table info list 



- Numbering (#)
- Haus no
- Email
- Country
- Attn

테이블 구성을 진행하였으며, 화면 작아질 시 스크롤 생기게 진행. 테이블같은 경우 데이터 내부의 값이 하나라도 유동적일 경우 다른 값들이 작을 경우에도 하나의 td 때문에 매우 커질수 있기 때문.





## 2. List Click Modal Form data list

| Name      | required | type     |
| --------- | -------- | -------- |
| Haus no   | true     | input    |
| Country   | true     | datalist |
| State     | false    | datalist |
| Zipcode   | true     | input    |
| Street(1) | true     | input    |
| Street(2) | false    | input    |
| City      | true     | input    |
| Email     | true     | input    |
| Tel       | true     | input    |
| Mob       | false    | input    |
| Attn      | true     | input    |

> 추가 요청사항
>
> Selectbox 추가 해달라하고 옵션은 2개 짜리 넣어달라고 요청 네임은 statePk 라고함.
>
> 옵션
>
> - billing // index 0
> - ship // index 1
>
> .ps 기존의 디자인인 데이터리스트가 아니라 셀렉트라 의아 했으나 일단 진행.



### Backend req form name

```js
private long dealerAddressPk;
private long fkDealerPk;
private String hausNo;
private String street1;
private String street2;
private String city;
private String state;
private String zipCode;
private int fkCountryDetailPk;
private int statePk;
private String email;
private String tel;
private String mobile;
private String attn;
private int addressType;
private int defaultAddressCheck;
private String countryName;
private String statesName;
// 선언 형 뒤쪽이 네임으로 추정.
```

<del>컨트리 체인지시 스테이트 변환 되야함. ajax필요</del>





## Status

- 페이지 컨트롤 시 section.mypage__menu_view 의 클래스에 on 을 붙이면 view에 표현.



## Issue

- 디자이너가 없는 상황이라 판단하기 어려움.

- bootstrab datalist 태그 활용 시 한번 선택후 제 클릭했을때 리스트 안나옴 현상 , input 테그로 datalist 태그를 컨트롤 해서 해당 현상이 발생, select 박스로 만들면 label을 걸어서 새로 만들어야하나 시간이 꽤 소요됨. // **디자인적인 부분으로 판단하기 어려움**

- jsp에서 어떤 패턴을 사용한지 몰라서 따로 패턴적용을 안함. spa가 아니라 큰 문제는 없어보이나, js파일 concat하여 사용하는 대규모 프로젝트로 커버리지가 정해질시 모듈 패턴 적용 필요.

  



#### Done

- New Address Add
- Address Info Support

 후 백엔드 개발자에게 `mypage.html, mypage.js, mypage.css, polyfills.js, common.min.css`파일 이관.

