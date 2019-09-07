import React from 'react';
class ClientsCreate extends React.Component {
 constructor(props){
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
 }

 componentDidMount() {
    fetch(process.env.REACT_APP_SERVICE_URL + "/client/cities_list_service")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



 handleSubmit(event){ 
  event.preventDefault();
  const dataForm = {
    "name": this.refs.name.value,
    "nit": this.refs.nit.value,
    "address": this.refs.address.value,
    "cities_id": this.refs.cities_id.value,
    "phone": this.refs.phone.value,
    "quota": this.refs.quota.value,
    "quota_balance": this.refs.quota.value
   };

  var str = [];
  for (var p in dataForm)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataForm[p]));
  const flagT = str.join("&");
  fetch('http://[::1]/ciclomontana2/public/client/clients_create_service', {
      method: 'POST',
      headers: {
          "Content-type": "application/x-www-form-urlencoded"
      },
      body: flagT
  }).then(function(response) {
      return response.text;
  }).then(function(text) {
      console.log(text);
  }).catch(function(error) {
      console.error(error);
  });
  }

 render () {
  const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
  return (<div id="clientCreate">
    <form onSubmit={this.handleSubmit}>
         <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>NIT</strong>
                <input type="text" ref="nit" name="nit" className="form-control" placeholder="NIT*"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Nombre completo</strong>
                <input type="text"  ref="name" name="name" className="form-control" placeholder="Nombre completo*"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Dirección</strong>
                <input type="text" ref="address" name="address" className="form-control" placeholder="Dirección"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Ciudad</strong>
                <select ref="cities_id" name="cities_id" className="form-control">
                {items.map(item => (
                  <option key={item.id} value="{item.id}">{item.name}</option>
                ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Teléfono</strong>
                <input type="number" ref="phone" name="phone" className="form-control" placeholder="Teléfono"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Cupo</strong>
                <input type="number" ref="quota"  name="quota" className="form-control" placeholder="Cupo*"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Porcentaje visitas</strong>
                <input type="text" ref="visits_percentage" name="visits_percentage" className="form-control" placeholder="Porcentaje visitas*"/>
              </div>
            </div>
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </div>
    </form>
​   </div>)
}
 }
}

export default ClientsCreate;