import datetime as dt
import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///databases/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to the measurements and stationss tables
measure = Base.classes.measurements
stat = Base.classes.stations

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Avalable Routes:<br/>"
        f"/api/v1.0/precip - Annual Precipitation<br/>"

        f"/api/v1.0/stations/active/observations"
        f"- List of most active observation stations<br/>"

        f"/api/v1.0/tobs/date"
        f"- Temperature for a year<br/>"

        f"/api/v1.0/tobs/filter/date"
        f"- Temperatures last year same week as vacation<br/>"

        f"/api/v1.0/tobsavg/tobsmin/tobsmax"
        f"- Average, Minimum and Maximum temps same week last year<br/>"
    )


@app.route("/api/v1.0/precip - Annual Precipitation")
def precip():
    """Return a list of precip for 365 days"""
    
    precipyear = session.query(measure.date, func.sum(measure.prcp)).\
        order_by(measure.date.desc()).group_by(measure.date).all()

    dailyprecip = []
    for precip in precipyear:

        row = {} 
        row["date"] = precipyear[0]
        row["prcp"] = precipyear[1]
        dailyprecip.append(row)
    return jsonify(dailyprecip)


@app.route("/api/v1.0/stations/active/observations")
def stations():
    """Return a list active stations by tobs.

    Each item in the list is a dictionary with keys `country` and `total`"""
    
    tobscount = func.count(measure.tobs)
    DescStations = session.query(measure.station, func.count(measure.station)).\
        order_by(tobscount.desc()).group_by(measure.station).all()
    # Convert list of tuples into normal list
    ActiveStations = list(np.ravel(DescStations))

    return jsonify(ActiveStations)


@app.route("/api/v1.0/tobs/date")
def tobs():
    """Return a list of temp observations for one year."""
    obsresults = session.query(measure.date, measure.tobs)

    temp_obs = list(np.ravel(obsresults))

    return jsonify(temp_obs)


@app.route("/api/v1.0/tobs/filter/date")
def last_year():
    """Return the week of temperatures of last year."""
    
    results = session.query(measure.date, measure.tobs).\
        filter(measure.date >='2017-07-01').\
        filter(measure.date <='2017-07-10').all()

    year_temps = list(np.ravel(results))

    return jsonify(year_temps)


@app.route("/api/v1.0/tobsavg/tobsmin/tobsmax")
def temp_min_max_avg():

    """Returns the min max avg temperature last year same week."""
    
    tobsavg = func.avg(measure.tobs)
    tobsmin = func.min(measure.tobs)
    tobsmax= func.max(measure.tobs)
    #startdate = measure.date == "2016-07-01"
    #enddate = measure.date == "2016-07-10"

    session.query(measure.date, tobsmin, tobsmax, tobsavg).\
        filter(measure.date >='2017-07-01').\
        filter(measure.date <='2017-07-10').all()
# enter in different filter dates or remove a filter as needed for this query



if __name__ == '__main__':
    app.run()
