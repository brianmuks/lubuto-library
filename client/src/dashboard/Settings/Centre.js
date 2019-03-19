import React, { Fragment, useEffect,useState } from "react";
import { setCentre } from "./methods";
import { withTracker } from "meteor/react-meteor-data";
import { COL_CONFIG } from "../../../../lib/Collections";

const iniState = {
    centre:{
        centre: null,
        location: null,
        province: null,
        country: null,
    },
    _id:null,
};

function Centre({ config}) {
    const [state, setState] = useState(iniState);

    useEffect(()=>{
        console.log(config)
        const { centre, location, province, country, _id}  = config || {};
        const _state = {centre:{centre,location,province,country},_id};
        config && setState(_state);
    }, [config])


    const onChange = ({e,name}) =>{
        const val = e.target.value.toString().trim();
        const _state = {};
        _state[name] = val;
        setState({ ...state,centre:{
            ...state.centre,
            ..._state
        }});
    }
    return <Fragment>
<div className="row">
    <form className="col s10 offset-m2 center-container">

      <div className="container">
        <div className="input-field col s6">
                        <input placeholder="Placeholder" onChange={e => onChange({ e, name: 'centre' })} defaultValue={state.centre.centre}  type="text" className="validate" />
          <label htmlFor="first_name">Centre</label>
        </div>
        <div className="input-field col s6">
                        <input  onChange={e => onChange({ e, name: 'location' })} type="text" defaultValue={state.centre.location} className="validate" placeholder={'e,g Ngombe'} />
          <label htmlFor="last_name">Location</label>
        </div>
                    <div className="input-field col s6">
                        <input  onChange={e => onChange({ e, name: 'province' })} type="text" defaultValue={state.centre.province} className="validate" placeholder={'e,g Ngombe'} />
                        <label htmlFor="last_name">Province</label>
                    </div>
                    <div className="input-field col s6">
                        <input  onChange={e => onChange({ e, name: 'country' })} defaultValue={state.centre.country} type="text" className="validate" placeholder={'e,g Ngombe'} />
                        <label htmlFor="last_name">Country</label>
                    </div>
                    <a className="waves-effect waves-light btn" onClick={e => setCentre({ centre: state.centre,_id:state._id})}  >Save</a>
      </div>
    </form>
  </div>

          </Fragment>
}


export default withTracker(() => {
    Meteor.subscribe("col_config");
    Meteor.subscribe("users");
    return {
        config: COL_CONFIG.findOne({})
    };
})(Centre);

