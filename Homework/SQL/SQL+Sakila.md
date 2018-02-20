

```python
from sqlalchemy import create_engine
import pandas as pd
from warnings import filterwarnings
import pymysql
filterwarnings('ignore', category=pymysql.Warning)
import os
engine = create_engine('mysql+pymysql://root:kuCourage3@localhost/sakila') 
```


```python
def RunSQL(sql_command):
    connection = pymysql.connect(host='localhost',
                             user='root',
                             password='kuCourage3',
                             db='sakila',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            commands = sql_command.split(';')
            for command in commands:
                if command == '\n': continue
                cursor.execute(command + ';')
                connection.commit()
    except Exception as e: 
        print(e)
    finally:
        connection.close()
```


```python
#1a
sql_query = """
select actor.actor_id, actor.first_name, actor.last_name from actor;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>GUINESS</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>NICK</td>
      <td>WAHLBERG</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ED</td>
      <td>CHASE</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>JENNIFER</td>
      <td>DAVIS</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>JOHNNY</td>
      <td>LOLLOBRIGIDA</td>
    </tr>
  </tbody>
</table>
</div>




```python
#1b
sql_query = """
select UPPER(CONCAT(actor.first_name, ' ', actor.last_name)) AS `Actor Name` from actor;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Actor Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>PENELOPE GUINESS</td>
    </tr>
    <tr>
      <th>1</th>
      <td>NICK WAHLBERG</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ED CHASE</td>
    </tr>
    <tr>
      <th>3</th>
      <td>JENNIFER DAVIS</td>
    </tr>
    <tr>
      <th>4</th>
      <td>JOHNNY LOLLOBRIGIDA</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2a
sql_query = """
select actor.actor_id, actor.first_name, actor.last_name from actor
where actor.first_name = 'Joe';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>9</td>
      <td>JOE</td>
      <td>SWANK</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2b
sql_query = """
select actor.last_name from actor
where actor.last_name like '%%GEN%%';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>BERGEN</td>
    </tr>
    <tr>
      <th>1</th>
      <td>DEGENERES</td>
    </tr>
    <tr>
      <th>2</th>
      <td>DEGENERES</td>
    </tr>
    <tr>
      <th>3</th>
      <td>DEGENERES</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2c
sql_query = """
select actor.last_name, actor.first_name from actor
where actor.last_name like '%%LI%%'
order by actor.last_name asc;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
      <th>first_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CHAPLIN</td>
      <td>GREG</td>
    </tr>
    <tr>
      <th>1</th>
      <td>JOLIE</td>
      <td>WOODY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>OLIVIER</td>
      <td>CUBA</td>
    </tr>
    <tr>
      <th>3</th>
      <td>OLIVIER</td>
      <td>AUDREY</td>
    </tr>
    <tr>
      <th>4</th>
      <td>WILLIAMS</td>
      <td>SEAN</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2d 
sql_query = """
select * 
from country
where country_id IN
(
  select country_id
  from country
  where country in ('Afghanistan', 'Bangladesh', 'China')
);
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>country_id</th>
      <th>country</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Afghanistan</td>
      <td>2006-02-15 04:44:00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>12</td>
      <td>Bangladesh</td>
      <td>2006-02-15 04:44:00</td>
    </tr>
    <tr>
      <th>2</th>
      <td>23</td>
      <td>China</td>
      <td>2006-02-15 04:44:00</td>
    </tr>
  </tbody>
</table>
</div>




```python
#3a Add a middle name column to the table actor. Position between first_name and last_name. Specify data type first!
actor = pd.read_sql_query('select * from actor', engine)
actor.head(1)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
sql_query = """
ALTER TABLE actor ADD COLUMN middle_name varchar(30) AFTER first_name;
"""
RunSQL(sql_query)
actor = pd.read_sql_query('select * from actor', engine)
actor.head(1) 
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>middle_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#3b Change data type of middle_name column to blob
sql_query = """
ALTER TABLE actor UPDATE COLUMN middle_name BLOB;

""" 
RunSQL(sql_query)
middle_name = pd.read_sql_query('select * from actor', engine)
middle_name.head(1)        
```

    (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'UPDATE COLUMN middle_name BLOB' at line 1")
    




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>middle_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#3c Delete middle_name column
sql_query = """
ALTER TABLE actor DROP COLUMN middle_name; 

""" 
RunSQL(sql_query)
actor = pd.read_sql_query('select * from actor', engine)
actor.head(1)      
```

    (1065, 'Query was empty')
    




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4a https://www.w3resource.com/sql/aggregate-functions/count-with-group-by.php
sql_query = """
select actor.last_name, COUNT(*)
from actor
group by actor.last_name;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
      <th>COUNT(*)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AKROYD</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ALLEN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ASTAIRE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BACALL</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BAILEY</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4b
sql_query = """
select actor.last_name, COUNT(*) 
from actor
group by actor.last_name
having Count(*) > 1;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
      <th>COUNT(*)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AKROYD</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ALLEN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>BAILEY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BENING</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BERRY</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4c
sql_query = """
 select actor_id, actor.first_name, actor.last_name from actor
 Where actor.first_name = 'Groucho';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>78</td>
      <td>GROUCHO</td>
      <td>SINATRA</td>
    </tr>
    <tr>
      <th>1</th>
      <td>106</td>
      <td>GROUCHO</td>
      <td>DUNST</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4c https://www.techonthenet.com/sql/and_or.php
sql_query = """
UPDATE Table actor
SET first_name = 'HARPO'
WHERE first_name = 'GROUCHO' AND actor_id = '172';
"""
RunSQL(sql_query)
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```

    (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'HARPO'\nWHERE first_name = 'GROUCHO' AND actor_id =' at line 1")
    


    ---------------------------------------------------------------------------

    ProgrammingError                          Traceback (most recent call last)

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1181                         parameters,
    -> 1182                         context)
       1183         except BaseException as e:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\default.py in do_execute(self, cursor, statement, parameters, context)
        469     def do_execute(self, cursor, statement, parameters, context=None):
    --> 470         cursor.execute(statement, parameters)
        471 
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in execute(self, query, args)
        164 
    --> 165         result = self._query(query)
        166         self._executed = query
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in _query(self, q)
        320         self._last_executed = q
    --> 321         conn.query(q)
        322         self._do_get_result()
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in query(self, sql, unbuffered)
        859         self._execute_command(COMMAND.COM_QUERY, sql)
    --> 860         self._affected_rows = self._read_query_result(unbuffered=unbuffered)
        861         return self._affected_rows
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_query_result(self, unbuffered)
       1060             result = MySQLResult(self)
    -> 1061             result.read()
       1062         self._result = result
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in read(self)
       1348         try:
    -> 1349             first_packet = self.connection._read_packet()
       1350 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_packet(self, packet_type)
       1017         packet = packet_type(buff, self.encoding)
    -> 1018         packet.check_error()
       1019         return packet
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in check_error(self)
        383             if DEBUG: print("errno =", errno)
    --> 384             err.raise_mysql_exception(self._data)
        385 
    

    ~\Anaconda3\lib\site-packages\pymysql\err.py in raise_mysql_exception(data)
        106     errorclass = error_map.get(errno, InternalError)
    --> 107     raise errorclass(errno, errval)
    

    ProgrammingError: (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'HARPO'\nWHERE first_name = 'GROUCHO' AND actor_id =' at line 1")

    
    The above exception was the direct cause of the following exception:
    

    ProgrammingError                          Traceback (most recent call last)

    <ipython-input-472-6c1bb2d62ae2> in <module>()
          6 """
          7 RunSQL(sql_query)
    ----> 8 query_return = pd.read_sql_query(sql_query, engine)
          9 query_return.head()
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in read_sql_query(sql, con, index_col, coerce_float, params, parse_dates, chunksize)
        330     return pandas_sql.read_query(
        331         sql, index_col=index_col, params=params, coerce_float=coerce_float,
    --> 332         parse_dates=parse_dates, chunksize=chunksize)
        333 
        334 
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in read_query(self, sql, index_col, coerce_float, parse_dates, params, chunksize)
       1085         args = _convert_params(sql, params)
       1086 
    -> 1087         result = self.execute(*args)
       1088         columns = result.keys()
       1089 
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in execute(self, *args, **kwargs)
        976     def execute(self, *args, **kwargs):
        977         """Simple passthrough to SQLAlchemy connectable"""
    --> 978         return self.connectable.execute(*args, **kwargs)
        979 
        980     def read_table(self, table_name, index_col=None, coerce_float=True,
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in execute(self, statement, *multiparams, **params)
       2062 
       2063         connection = self.contextual_connect(close_with_result=True)
    -> 2064         return connection.execute(statement, *multiparams, **params)
       2065 
       2066     def scalar(self, statement, *multiparams, **params):
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in execute(self, object, *multiparams, **params)
        937         """
        938         if isinstance(object, util.string_types[0]):
    --> 939             return self._execute_text(object, multiparams, params)
        940         try:
        941             meth = object._execute_on_connection
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_text(self, statement, multiparams, params)
       1095             statement,
       1096             parameters,
    -> 1097             statement, parameters
       1098         )
       1099         if self._has_events or self.engine._has_events:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1187                 parameters,
       1188                 cursor,
    -> 1189                 context)
       1190 
       1191         if self._has_events or self.engine._has_events:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _handle_dbapi_exception(self, e, statement, parameters, cursor, context)
       1400                 util.raise_from_cause(
       1401                     sqlalchemy_exception,
    -> 1402                     exc_info
       1403                 )
       1404             else:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\util\compat.py in raise_from_cause(exception, exc_info)
        201     exc_type, exc_value, exc_tb = exc_info
        202     cause = exc_value if exc_value is not exception else None
    --> 203     reraise(type(exception), exception, tb=exc_tb, cause=cause)
        204 
        205 if py3k:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\util\compat.py in reraise(tp, value, tb, cause)
        184             value.__cause__ = cause
        185         if value.__traceback__ is not tb:
    --> 186             raise value.with_traceback(tb)
        187         raise value
        188 
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1180                         statement,
       1181                         parameters,
    -> 1182                         context)
       1183         except BaseException as e:
       1184             self._handle_dbapi_exception(
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\default.py in do_execute(self, cursor, statement, parameters, context)
        468 
        469     def do_execute(self, cursor, statement, parameters, context=None):
    --> 470         cursor.execute(statement, parameters)
        471 
        472     def do_execute_no_params(self, cursor, statement, context=None):
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in execute(self, query, args)
        163         query = self.mogrify(query, args)
        164 
    --> 165         result = self._query(query)
        166         self._executed = query
        167         return result
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in _query(self, q)
        319         conn = self._get_db()
        320         self._last_executed = q
    --> 321         conn.query(q)
        322         self._do_get_result()
        323         return self.rowcount
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in query(self, sql, unbuffered)
        858                 sql = sql.encode(self.encoding, 'surrogateescape')
        859         self._execute_command(COMMAND.COM_QUERY, sql)
    --> 860         self._affected_rows = self._read_query_result(unbuffered=unbuffered)
        861         return self._affected_rows
        862 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_query_result(self, unbuffered)
       1059         else:
       1060             result = MySQLResult(self)
    -> 1061             result.read()
       1062         self._result = result
       1063         if result.server_status is not None:
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in read(self)
       1347     def read(self):
       1348         try:
    -> 1349             first_packet = self.connection._read_packet()
       1350 
       1351             if first_packet.is_ok_packet():
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_packet(self, packet_type)
       1016 
       1017         packet = packet_type(buff, self.encoding)
    -> 1018         packet.check_error()
       1019         return packet
       1020 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in check_error(self)
        382             errno = self.read_uint16()
        383             if DEBUG: print("errno =", errno)
    --> 384             err.raise_mysql_exception(self._data)
        385 
        386     def dump(self):
    

    ~\Anaconda3\lib\site-packages\pymysql\err.py in raise_mysql_exception(data)
        105         errval = data[3:].decode('utf-8', 'replace')
        106     errorclass = error_map.get(errno, InternalError)
    --> 107     raise errorclass(errno, errval)
    

    ProgrammingError: (pymysql.err.ProgrammingError) (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'HARPO'\nWHERE first_name = 'GROUCHO' AND actor_id =' at line 1") [SQL: "\nUPDATE Table actor\nSET first_name = 'HARPO'\nWHERE first_name = 'GROUCHO' AND actor_id = '172';\n"]



```python
#4d
sql_query = """
UPDATE Table actor
SET first_name = 'GROUCHO'
WHERE first_name = 'HARPO' AND actor_id = '172';
"""
RunSQL(sql_query)
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```

    (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'GROUCHO'\nWHERE first_name = 'HARPO' AND actor_id =' at line 1")
    


    ---------------------------------------------------------------------------

    ProgrammingError                          Traceback (most recent call last)

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1181                         parameters,
    -> 1182                         context)
       1183         except BaseException as e:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\default.py in do_execute(self, cursor, statement, parameters, context)
        469     def do_execute(self, cursor, statement, parameters, context=None):
    --> 470         cursor.execute(statement, parameters)
        471 
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in execute(self, query, args)
        164 
    --> 165         result = self._query(query)
        166         self._executed = query
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in _query(self, q)
        320         self._last_executed = q
    --> 321         conn.query(q)
        322         self._do_get_result()
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in query(self, sql, unbuffered)
        859         self._execute_command(COMMAND.COM_QUERY, sql)
    --> 860         self._affected_rows = self._read_query_result(unbuffered=unbuffered)
        861         return self._affected_rows
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_query_result(self, unbuffered)
       1060             result = MySQLResult(self)
    -> 1061             result.read()
       1062         self._result = result
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in read(self)
       1348         try:
    -> 1349             first_packet = self.connection._read_packet()
       1350 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_packet(self, packet_type)
       1017         packet = packet_type(buff, self.encoding)
    -> 1018         packet.check_error()
       1019         return packet
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in check_error(self)
        383             if DEBUG: print("errno =", errno)
    --> 384             err.raise_mysql_exception(self._data)
        385 
    

    ~\Anaconda3\lib\site-packages\pymysql\err.py in raise_mysql_exception(data)
        106     errorclass = error_map.get(errno, InternalError)
    --> 107     raise errorclass(errno, errval)
    

    ProgrammingError: (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'GROUCHO'\nWHERE first_name = 'HARPO' AND actor_id =' at line 1")

    
    The above exception was the direct cause of the following exception:
    

    ProgrammingError                          Traceback (most recent call last)

    <ipython-input-473-ead332755528> in <module>()
          6 """
          7 RunSQL(sql_query)
    ----> 8 query_return = pd.read_sql_query(sql_query, engine)
          9 query_return.head()
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in read_sql_query(sql, con, index_col, coerce_float, params, parse_dates, chunksize)
        330     return pandas_sql.read_query(
        331         sql, index_col=index_col, params=params, coerce_float=coerce_float,
    --> 332         parse_dates=parse_dates, chunksize=chunksize)
        333 
        334 
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in read_query(self, sql, index_col, coerce_float, parse_dates, params, chunksize)
       1085         args = _convert_params(sql, params)
       1086 
    -> 1087         result = self.execute(*args)
       1088         columns = result.keys()
       1089 
    

    ~\Anaconda3\lib\site-packages\pandas\io\sql.py in execute(self, *args, **kwargs)
        976     def execute(self, *args, **kwargs):
        977         """Simple passthrough to SQLAlchemy connectable"""
    --> 978         return self.connectable.execute(*args, **kwargs)
        979 
        980     def read_table(self, table_name, index_col=None, coerce_float=True,
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in execute(self, statement, *multiparams, **params)
       2062 
       2063         connection = self.contextual_connect(close_with_result=True)
    -> 2064         return connection.execute(statement, *multiparams, **params)
       2065 
       2066     def scalar(self, statement, *multiparams, **params):
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in execute(self, object, *multiparams, **params)
        937         """
        938         if isinstance(object, util.string_types[0]):
    --> 939             return self._execute_text(object, multiparams, params)
        940         try:
        941             meth = object._execute_on_connection
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_text(self, statement, multiparams, params)
       1095             statement,
       1096             parameters,
    -> 1097             statement, parameters
       1098         )
       1099         if self._has_events or self.engine._has_events:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1187                 parameters,
       1188                 cursor,
    -> 1189                 context)
       1190 
       1191         if self._has_events or self.engine._has_events:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _handle_dbapi_exception(self, e, statement, parameters, cursor, context)
       1400                 util.raise_from_cause(
       1401                     sqlalchemy_exception,
    -> 1402                     exc_info
       1403                 )
       1404             else:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\util\compat.py in raise_from_cause(exception, exc_info)
        201     exc_type, exc_value, exc_tb = exc_info
        202     cause = exc_value if exc_value is not exception else None
    --> 203     reraise(type(exception), exception, tb=exc_tb, cause=cause)
        204 
        205 if py3k:
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\util\compat.py in reraise(tp, value, tb, cause)
        184             value.__cause__ = cause
        185         if value.__traceback__ is not tb:
    --> 186             raise value.with_traceback(tb)
        187         raise value
        188 
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\base.py in _execute_context(self, dialect, constructor, statement, parameters, *args)
       1180                         statement,
       1181                         parameters,
    -> 1182                         context)
       1183         except BaseException as e:
       1184             self._handle_dbapi_exception(
    

    ~\Anaconda3\lib\site-packages\sqlalchemy\engine\default.py in do_execute(self, cursor, statement, parameters, context)
        468 
        469     def do_execute(self, cursor, statement, parameters, context=None):
    --> 470         cursor.execute(statement, parameters)
        471 
        472     def do_execute_no_params(self, cursor, statement, context=None):
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in execute(self, query, args)
        163         query = self.mogrify(query, args)
        164 
    --> 165         result = self._query(query)
        166         self._executed = query
        167         return result
    

    ~\Anaconda3\lib\site-packages\pymysql\cursors.py in _query(self, q)
        319         conn = self._get_db()
        320         self._last_executed = q
    --> 321         conn.query(q)
        322         self._do_get_result()
        323         return self.rowcount
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in query(self, sql, unbuffered)
        858                 sql = sql.encode(self.encoding, 'surrogateescape')
        859         self._execute_command(COMMAND.COM_QUERY, sql)
    --> 860         self._affected_rows = self._read_query_result(unbuffered=unbuffered)
        861         return self._affected_rows
        862 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_query_result(self, unbuffered)
       1059         else:
       1060             result = MySQLResult(self)
    -> 1061             result.read()
       1062         self._result = result
       1063         if result.server_status is not None:
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in read(self)
       1347     def read(self):
       1348         try:
    -> 1349             first_packet = self.connection._read_packet()
       1350 
       1351             if first_packet.is_ok_packet():
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in _read_packet(self, packet_type)
       1016 
       1017         packet = packet_type(buff, self.encoding)
    -> 1018         packet.check_error()
       1019         return packet
       1020 
    

    ~\Anaconda3\lib\site-packages\pymysql\connections.py in check_error(self)
        382             errno = self.read_uint16()
        383             if DEBUG: print("errno =", errno)
    --> 384             err.raise_mysql_exception(self._data)
        385 
        386     def dump(self):
    

    ~\Anaconda3\lib\site-packages\pymysql\err.py in raise_mysql_exception(data)
        105         errval = data[3:].decode('utf-8', 'replace')
        106     errorclass = error_map.get(errno, InternalError)
    --> 107     raise errorclass(errno, errval)
    

    ProgrammingError: (pymysql.err.ProgrammingError) (1064, "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'Table actor\nSET first_name = 'GROUCHO'\nWHERE first_name = 'HARPO' AND actor_id =' at line 1") [SQL: "\nUPDATE Table actor\nSET first_name = 'GROUCHO'\nWHERE first_name = 'HARPO' AND actor_id = '172';\n"]



```python
#rerun 4c -oops I think I permanently deleted it
sql_query = """
 select actor_id, actor.first_name, actor.last_name from actor
 Where actor.first_name = 'Groucho';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>78</td>
      <td>GROUCHO</td>
      <td>SINATRA</td>
    </tr>
    <tr>
      <th>1</th>
      <td>106</td>
      <td>GROUCHO</td>
      <td>DUNST</td>
    </tr>
  </tbody>
</table>
</div>




```python
#where is harpo? I can't get him back to Groucho. -1 pt!
sql_query = """
 select actor_id, actor.first_name, actor.last_name from actor
 Where actor.first_name = 'Harpo';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>172</td>
      <td>HARPO</td>
      <td>WILLIAMS</td>
    </tr>
  </tbody>
</table>
</div>




```python
#5a
sql_query = """
Show create table address;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Table</th>
      <th>Create Table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>address</td>
      <td>CREATE TABLE `address` (\n  `address_id` small...</td>
    </tr>
  </tbody>
</table>
</div>




```python
#5a
sql_query = """
show index from address;
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Table</th>
      <th>Non_unique</th>
      <th>Key_name</th>
      <th>Seq_in_index</th>
      <th>Column_name</th>
      <th>Collation</th>
      <th>Cardinality</th>
      <th>Sub_part</th>
      <th>Packed</th>
      <th>Null</th>
      <th>Index_type</th>
      <th>Comment</th>
      <th>Index_comment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>address</td>
      <td>0</td>
      <td>PRIMARY</td>
      <td>1</td>
      <td>address_id</td>
      <td>A</td>
      <td>603</td>
      <td>NaN</td>
      <td>None</td>
      <td></td>
      <td>BTREE</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>1</th>
      <td>address</td>
      <td>1</td>
      <td>idx_fk_city_id</td>
      <td>1</td>
      <td>city_id</td>
      <td>A</td>
      <td>599</td>
      <td>NaN</td>
      <td>None</td>
      <td></td>
      <td>BTREE</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>address</td>
      <td>1</td>
      <td>idx_location</td>
      <td>1</td>
      <td>location</td>
      <td>A</td>
      <td>603</td>
      <td>32.0</td>
      <td>None</td>
      <td></td>
      <td>SPATIAL</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>




```python
#6a
staff = pd.read_sql_query('select * from staff', engine)
staff.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>staff_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>address_id</th>
      <th>picture</th>
      <th>email</th>
      <th>store_id</th>
      <th>active</th>
      <th>username</th>
      <th>password</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>3</td>
      <td>b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\...</td>
      <td>Mike.Hillyer@sakilastaff.com</td>
      <td>1</td>
      <td>1</td>
      <td>Mike</td>
      <td>8cb2237d0679ca88db6464eac60da96345513964</td>
      <td>2006-02-15 03:57:16</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Jon</td>
      <td>Stephens</td>
      <td>4</td>
      <td>None</td>
      <td>Jon.Stephens@sakilastaff.com</td>
      <td>2</td>
      <td>1</td>
      <td>Jon</td>
      <td>None</td>
      <td>2006-02-15 03:57:16</td>
    </tr>
  </tbody>
</table>
</div>




```python
address = pd.read_sql_query('select * from address', engine)
address.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>address_id</th>
      <th>address</th>
      <th>address2</th>
      <th>district</th>
      <th>city_id</th>
      <th>postal_code</th>
      <th>phone</th>
      <th>location</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>47 MySakila Drive</td>
      <td>None</td>
      <td>Alberta</td>
      <td>300</td>
      <td></td>
      <td></td>
      <td>b'\x00\x00\x00\x00\x01\x01\x00\x00\x00&gt;\n2]c4\...</td>
      <td>2014-09-25 22:30:27</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>28 MySQL Boulevard</td>
      <td>None</td>
      <td>QLD</td>
      <td>576</td>
      <td></td>
      <td></td>
      <td>b'\x00\x00\x00\x00\x01\x01\x00\x00\x00\x8e\x10...</td>
      <td>2014-09-25 22:30:09</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>23 Workhaven Lane</td>
      <td>None</td>
      <td>Alberta</td>
      <td>300</td>
      <td></td>
      <td>14033335568</td>
      <td>b'\x00\x00\x00\x00\x01\x01\x00\x00\x00\xcd\xc4...</td>
      <td>2014-09-25 22:30:27</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1411 Lillydale Drive</td>
      <td>None</td>
      <td>QLD</td>
      <td>576</td>
      <td></td>
      <td>6172235589</td>
      <td>b'\x00\x00\x00\x00\x01\x01\x00\x00\x00[\r\xe44...</td>
      <td>2014-09-25 22:30:09</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>1913 Hanoi Way</td>
      <td></td>
      <td>Nagasaki</td>
      <td>463</td>
      <td>35200</td>
      <td>28303384290</td>
      <td>b'\x00\x00\x00\x00\x01\x01\x00\x00\x00(\xd17\x...</td>
      <td>2014-09-25 22:31:53</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6a
sql_query = """
select address.address_id, staff.first_name, staff.last_name, address.address
from staff
inner join address
on address.address_id = staff.address_id;
"""

sample_query = pd.read_sql_query(sql_query, engine)
sample_query.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>address_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3</td>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>23 Workhaven Lane</td>
    </tr>
    <tr>
      <th>1</th>
      <td>4</td>
      <td>Jon</td>
      <td>Stephens</td>
      <td>1411 Lillydale Drive</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6b
payment = pd.read_sql_query('select * from payment', engine)
payment.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>payment_id</th>
      <th>customer_id</th>
      <th>staff_id</th>
      <th>rental_id</th>
      <th>amount</th>
      <th>payment_date</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>76.0</td>
      <td>2.99</td>
      <td>2005-05-25 11:30:37</td>
      <td>2006-02-15 22:12:30</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>573.0</td>
      <td>0.99</td>
      <td>2005-05-28 10:35:23</td>
      <td>2006-02-15 22:12:30</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>1</td>
      <td>1185.0</td>
      <td>5.99</td>
      <td>2005-06-15 00:54:12</td>
      <td>2006-02-15 22:12:30</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>2</td>
      <td>1422.0</td>
      <td>0.99</td>
      <td>2005-06-15 18:02:53</td>
      <td>2006-02-15 22:12:30</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>1</td>
      <td>2</td>
      <td>1476.0</td>
      <td>9.99</td>
      <td>2005-06-15 21:08:46</td>
      <td>2006-02-15 22:12:30</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6b START testing and building query
sql_query = """
select staff.staff_id, staff.first_name, staff.last_name, sum(payment.amount)
from staff
inner join payment

on payment.staff_id = staff.staff_id
group by staff.staff_id

;
"""

sample_query = pd.read_sql_query(sql_query, engine)
sample_query.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>staff_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>sum(payment.amount)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>33489.47</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Jon</td>
      <td>Stephens</td>
      <td>33927.04</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6b keep building query, need date and total amount for each staff. Completed!
#https://www.w3resource.com/sql/aggregate-functions/sum-function.php
sql_query = """
select staff.staff_id, staff.first_name, staff.last_name, sum(payment.amount) AS "Total Rung Up"
from staff
inner join payment
on payment.staff_id = staff.staff_id
WHERE payment.payment_date LIKE '%%05-08%%'
group by staff.staff_id

;
"""

sample_query = pd.read_sql_query(sql_query, engine)
sample_query.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>staff_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>Total Rung Up</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>11853.65</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Jon</td>
      <td>Stephens</td>
      <td>12218.48</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6c
sql_query = """
select film.title as "Film", COUNT(*) as "Number of Actors"

from film
inner join film_actor

on film.film_id = film_actor.film_id
group by film.title

;
"""

sample_query = pd.read_sql_query(sql_query, engine)
sample_query.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Film</th>
      <th>Number of Actors</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ACADEMY DINOSAUR</td>
      <td>10</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ACE GOLDFINGER</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ADAPTATION HOLES</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>AFFAIR PREJUDICE</td>
      <td>5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>AFRICAN EGG</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6d
sql_query = """
select film.film_id, film.title, sum(inventory.store_id) AS "Number of Copies" 
from inventory
join film using (film_id)
where film.title = 'Hunchback Impossible';
"""
query_return = pd.read_sql_query(sql_query, engine)
query_return.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>Number of Copies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>439</td>
      <td>HUNCHBACK IMPOSSIBLE</td>
      <td>8.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6e
sql_query = """
select customer.customer_id, customer.first_name, customer.last_name, sum(payment.amount) AS "Total Paid"
from customer
inner join payment
on payment.customer_id = customer.customer_id
group by customer.last_name
order by customer.last_name asc;

"""

sample_query = pd.read_sql_query(sql_query, engine)
sample_query.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>customer_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>Total Paid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>505</td>
      <td>RAFAEL</td>
      <td>ABNEY</td>
      <td>97.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>504</td>
      <td>NATHANIEL</td>
      <td>ADAM</td>
      <td>133.72</td>
    </tr>
    <tr>
      <th>2</th>
      <td>36</td>
      <td>KATHLEEN</td>
      <td>ADAMS</td>
      <td>92.73</td>
    </tr>
    <tr>
      <th>3</th>
      <td>96</td>
      <td>DIANA</td>
      <td>ALEXANDER</td>
      <td>105.73</td>
    </tr>
    <tr>
      <th>4</th>
      <td>470</td>
      <td>GORDON</td>
      <td>ALLARD</td>
      <td>160.68</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7a explore titles
sql_query = """
  SELECT *
  FROM film
  WHERE film.title LIKE 'Q%%' OR film.title LIKE 'K%%';
"""
QK = pd.read_sql_query(sql_query, engine)
QK.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>description</th>
      <th>release_year</th>
      <th>language_id</th>
      <th>original_language_id</th>
      <th>rental_duration</th>
      <th>rental_rate</th>
      <th>length</th>
      <th>replacement_cost</th>
      <th>rating</th>
      <th>special_features</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>493</td>
      <td>KANE EXORCIST</td>
      <td>A Epic Documentary of a Composer And a Robot w...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>5</td>
      <td>0.99</td>
      <td>92</td>
      <td>18.99</td>
      <td>R</td>
      <td>Trailers,Commentaries</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>1</th>
      <td>494</td>
      <td>KARATE MOON</td>
      <td>A Astounding Yarn of a Womanizer And a Dog who...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>4</td>
      <td>0.99</td>
      <td>120</td>
      <td>21.99</td>
      <td>PG-13</td>
      <td>Behind the Scenes</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>2</th>
      <td>495</td>
      <td>KENTUCKIAN GIANT</td>
      <td>A Stunning Yarn of a Woman And a Frisbee who m...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>5</td>
      <td>2.99</td>
      <td>169</td>
      <td>10.99</td>
      <td>PG</td>
      <td>Trailers,Commentaries,Deleted Scenes,Behind th...</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>3</th>
      <td>496</td>
      <td>KICK SAVANNAH</td>
      <td>A Emotional Drama of a Monkey And a Robot who ...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>3</td>
      <td>0.99</td>
      <td>179</td>
      <td>10.99</td>
      <td>PG-13</td>
      <td>Trailers,Commentaries,Deleted Scenes</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>4</th>
      <td>497</td>
      <td>KILL BROTHERHOOD</td>
      <td>A Touching Display of a Hunter And a Secret Ag...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>4</td>
      <td>0.99</td>
      <td>54</td>
      <td>15.99</td>
      <td>G</td>
      <td>Trailers,Commentaries</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
  </tbody>
</table>
</div>




```python
language = pd.read_sql_query('select * from language', engine)
language.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>language_id</th>
      <th>name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>English</td>
      <td>2006-02-15 05:02:19</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Italian</td>
      <td>2006-02-15 05:02:19</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Japanese</td>
      <td>2006-02-15 05:02:19</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>Mandarin</td>
      <td>2006-02-15 05:02:19</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>French</td>
      <td>2006-02-15 05:02:19</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7a
sql_query = """

SELECT *
FROM film
WHERE film.title LIKE 'Q%%' OR film.title LIKE 'K%%'
AND language_id IN

(
  Select language_id
  FROM language 
  Where language_id = 1
);

"""
QK = pd.read_sql_query(sql_query, engine)
QK.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>description</th>
      <th>release_year</th>
      <th>language_id</th>
      <th>original_language_id</th>
      <th>rental_duration</th>
      <th>rental_rate</th>
      <th>length</th>
      <th>replacement_cost</th>
      <th>rating</th>
      <th>special_features</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>493</td>
      <td>KANE EXORCIST</td>
      <td>A Epic Documentary of a Composer And a Robot w...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>5</td>
      <td>0.99</td>
      <td>92</td>
      <td>18.99</td>
      <td>R</td>
      <td>Trailers,Commentaries</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>1</th>
      <td>494</td>
      <td>KARATE MOON</td>
      <td>A Astounding Yarn of a Womanizer And a Dog who...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>4</td>
      <td>0.99</td>
      <td>120</td>
      <td>21.99</td>
      <td>PG-13</td>
      <td>Behind the Scenes</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>2</th>
      <td>495</td>
      <td>KENTUCKIAN GIANT</td>
      <td>A Stunning Yarn of a Woman And a Frisbee who m...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>5</td>
      <td>2.99</td>
      <td>169</td>
      <td>10.99</td>
      <td>PG</td>
      <td>Trailers,Commentaries,Deleted Scenes,Behind th...</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>3</th>
      <td>496</td>
      <td>KICK SAVANNAH</td>
      <td>A Emotional Drama of a Monkey And a Robot who ...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>3</td>
      <td>0.99</td>
      <td>179</td>
      <td>10.99</td>
      <td>PG-13</td>
      <td>Trailers,Commentaries,Deleted Scenes</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
    <tr>
      <th>4</th>
      <td>497</td>
      <td>KILL BROTHERHOOD</td>
      <td>A Touching Display of a Hunter And a Secret Ag...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>4</td>
      <td>0.99</td>
      <td>54</td>
      <td>15.99</td>
      <td>G</td>
      <td>Trailers,Commentaries</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7b
sql_query = """

SELECT first_name, last_name
FROM actor
WHERE actor_id IN

(
  Select actor_id
  FROM film_actor
  Where film_id IN
  (
    Select film_id
    FROM film
    where film.title = 'Alone Trip'
  )
);

"""
aloneactors = pd.read_sql_query(sql_query, engine)
aloneactors.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>ED</td>
      <td>CHASE</td>
    </tr>
    <tr>
      <th>1</th>
      <td>KARL</td>
      <td>BERRY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>UMA</td>
      <td>WOOD</td>
    </tr>
    <tr>
      <th>3</th>
      <td>WOODY</td>
      <td>JOLIE</td>
    </tr>
    <tr>
      <th>4</th>
      <td>SPENCER</td>
      <td>DEPP</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7c find country_id for Canada
sql_query = """
  SELECT country_id, country 
  FROM Country
  WHERE Country LIKE 'Can%%';
"""
Canada = pd.read_sql_query(sql_query, engine)
Canada.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>country_id</th>
      <th>country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>20</td>
      <td>Canada</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7c
sql_query = """
select customer_id, first_name, last_name, email
from customer
where customer_id IN
(
  select customer_id
  from address
  where address_id IN
  (
    select address_id 
    from city
    where city_id IN
    (
      select city_id
      from country
      where country_id = 20
    )
  )
);

"""

canada = pd.read_sql_query(sql_query, engine)
canada.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>customer_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>MARY</td>
      <td>SMITH</td>
      <td>MARY.SMITH@sakilacustomer.org</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>PATRICIA</td>
      <td>JOHNSON</td>
      <td>PATRICIA.JOHNSON@sakilacustomer.org</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>LINDA</td>
      <td>WILLIAMS</td>
      <td>LINDA.WILLIAMS@sakilacustomer.org</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>BARBARA</td>
      <td>JONES</td>
      <td>BARBARA.JONES@sakilacustomer.org</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>ELIZABETH</td>
      <td>BROWN</td>
      <td>ELIZABETH.BROWN@sakilacustomer.org</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7d find film category_id for family
family = pd.read_sql_query('select * from category', engine)
family
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>category_id</th>
      <th>name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Action</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Animation</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>Children</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>Classics</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>Comedy</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>Documentary</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>Drama</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>Family</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>Foreign</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>Games</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>Horror</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>Music</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>New</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>Sci-Fi</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>Sports</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>Travel</td>
      <td>2006-02-15 04:46:27</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7d
sql_query = """
select film_text.title AS "Family Film"
from film_category
inner join film_text
on film_text.film_id = film_category.film_id
Where category_id = 8;
"""
family = pd.read_sql_query(sql_query, engine)
family.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Family Film</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AFRICAN EGG</td>
    </tr>
    <tr>
      <th>1</th>
      <td>APACHE DIVINE</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ATLANTIS CAUSE</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BAKED CLEOPATRA</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BANG KWAI</td>
    </tr>
  </tbody>
</table>
</div>




```python
titles = pd.read_sql_query('select * from film', engine)
titles.head(1)
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>description</th>
      <th>release_year</th>
      <th>language_id</th>
      <th>original_language_id</th>
      <th>rental_duration</th>
      <th>rental_rate</th>
      <th>length</th>
      <th>replacement_cost</th>
      <th>rating</th>
      <th>special_features</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>ACADEMY DINOSAUR</td>
      <td>A Epic Drama of a Feminist And a Mad Scientist...</td>
      <td>2006</td>
      <td>1</td>
      <td>None</td>
      <td>6</td>
      <td>0.99</td>
      <td>86</td>
      <td>20.99</td>
      <td>PG</td>
      <td>Deleted Scenes,Behind the Scenes</td>
      <td>2006-02-15 05:03:42</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7e most frequently rented movies in descending order. This one was hard and took a long time. Once I got it. I ripped
sql_query = """
SELECT 
    film.title AS "Title", 
    count(rental_id) as "Times Rented"
FROM
    Rental
INNER JOIN
    inventory on inventory.inventory_id = rental.inventory_id
INNER JOIN
    film on inventory.film_id = film.film_id
group by film.title
order by count(rental_id) desc
;
 
"""

customer_rental = pd.read_sql_query(sql_query, engine)
customer_rental.head()

```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Title</th>
      <th>Times Rented</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>BUCKET BROTHERHOOD</td>
      <td>34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ROCKETEER MOTHER</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>JUGGLER HARDLY</td>
      <td>32</td>
    </tr>
    <tr>
      <th>3</th>
      <td>SCALAWAG DUCK</td>
      <td>32</td>
    </tr>
    <tr>
      <th>4</th>
      <td>GRIT CLOCKWORK</td>
      <td>32</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7f
sql_query = """
SELECT 
    store.store_id AS "Store Number", 
    sum(payment.amount) as "Revenue"
FROM
    Store
INNER JOIN
    inventory on store.store_id = inventory.store_id
INNER JOIN
    rental on inventory.inventory_id = rental.inventory_id
INNER JOIN
    payment on rental.rental_id = payment.rental_id
group by store.store_id

;
 
"""

store_income = pd.read_sql_query(sql_query, engine)
store_income.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Store Number</th>
      <th>Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>33679.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>33726.77</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7f There are only 2 stores? yes! moving on..
stores = pd.read_sql_query('select * from store', engine)
stores.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>store_id</th>
      <th>manager_staff_id</th>
      <th>address_id</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>2006-02-15 04:57:12</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>2</td>
      <td>2</td>
      <td>2006-02-15 04:57:12</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7g
sql_query = """
  SELECT store_id AS "Store",
  city.city AS "City",
  country.country AS "Country" 
FROM
    Store
INNER JOIN
    address on store.address_id = address.address_id
INNER JOIN
    city on address.city_id = city.city_id
INNER JOIN
    country on city.country_id = country.country_id
group by store.store_id  
  ;
"""
Canada = pd.read_sql_query(sql_query, engine)
Canada.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Store</th>
      <th>City</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Lethbridge</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Woodridge</td>
      <td>Australia</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7h
sql_query = """
  SELECT category.name AS "Genre",
  sum(payment.amount) as "Revenue"
FROM
    category
INNER JOIN
    film_category on category.category_id = film_category.category_id
INNER JOIN
    inventory on film_category.film_id = inventory.film_id
INNER JOIN
    rental on inventory.inventory_id = rental.inventory_id
INNER JOIN
    payment on rental.rental_id = payment.rental_id
group by category.name
order by sum(payment.amount) desc
;
"""
genre = pd.read_sql_query(sql_query, engine)
genre.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Genre</th>
      <th>Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sports</td>
      <td>5314.21</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Sci-Fi</td>
      <td>4756.98</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Animation</td>
      <td>4656.30</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Drama</td>
      <td>4587.39</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Comedy</td>
      <td>4383.58</td>
    </tr>
  </tbody>
</table>
</div>




```python
#8a
sql_query = """
create view genre as
SELECT category.name AS "Genre",
  sum(payment.amount) as "Revenue"
FROM
    category
INNER JOIN
    film_category on category.category_id = film_category.category_id
INNER JOIN
    inventory on film_category.film_id = inventory.film_id
INNER JOIN
    rental on inventory.inventory_id = rental.inventory_id
INNER JOIN
    payment on rental.rental_id = payment.rental_id
group by category.name
order by sum(payment.amount) desc
"""
RunSQL(sql_query)
```


```python
sql_query = """
DROP view genre 

"""
RunSQL(sql_query)
```
