

select 1 Id,
(
select 

N'
{
                    about:{

                        category:''Авторизація'',
                        description:''Вулиці''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''PUT'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod

union all

select 2 Id,
(
select 

N'
{
                    about:{
                        category:''Авторизація'',
                        description:''Вулиці''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''DELETE'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod

union all

select 3 Id,
(
select 

N'
{
                    about:{
                        category:''Авторизація'',
                        description:''Вулиці''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''POST'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod

union all

select 4 Id,
(
select 

N'
{
                    about:{
                        category:''Довідники'',
                        description:''Будинки''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''POST'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod

union all

select 5 Id,
(
select 

N'
{
                    about:{
                        category:''Довідники'',
                        description:''Організації''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''PUT'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod

union all

select 6 Id,
(
select 

N'
{
                    about:{
                        category:''Отримати список задач'',
                        description:''Вулиці''
                    },
                    request: {
                        url:''http://apps.ukrods.cf:8075/CRM1551/api/section/API_web_1551_Applicant  '',
                        method: ''DELETE'',
                        headers: {
                            Authorization: ''Bearer 9S8oX3rhjibX_-rhji…'',
                            ContentType: ''application/json''
                        },
                        body:''JSON''
                    },
                    response: {
                        result:''JSON'',
                        error: ''error number''
                    }
                }
' cod

from (select 1 Id) t
for json auto
) api_cod
