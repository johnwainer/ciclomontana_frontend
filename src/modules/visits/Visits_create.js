import React from 'react';
class VisitsCreate extends React.Component {
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
    fetch("http://[::1]/ciclomontana2/public/client/clients_list_service")
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
  console.log(this.refs.name.value);


  const dataForm = {
    "clients_id": this.refs.clients_id.value,
    "sellers_id": this.refs.sellers_id.value,
    "date": this.refs.date.value,
    "price": this.refs.price.value,
    "visit_price": this.refs.visit_price.value,
    "observations": this.refs.observations.value
   };

  var str = [];
  for (var p in dataForm)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dataForm[p]));
  const flagT = str.join("&");
  fetch(process.env.REACT_APP_SERVICE_URL + '/client/clients_create_service', {
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
  return (<div id="visitCreate">
    <form onSubmit={this.handleSubmit}>
         <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                  <strong>Cliente</strong>
                  <select name="clients_id" ref="clients_id" id="clients_id" className="form-control">
                      {items.map(item => (
                        <option key={item.id} value="{item.id}">{item.name}</option>
                      ))}
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Vendedor</strong>
                  <select name="sellers_id" ref="sellers_id" className="form-control">
                      <option value="1">Vendedor 1 </option>
                      <option value="2">Vendedor 2 </option>
                      <option value="3">Vendedor 3 </option>
                      <option value="4">Vendedor 4 </option>
                  </select>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Fecha</strong>
                  <input type="date" name="date" ref="date" id="date" className="form-control" placeholder="Fecha"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor neto</strong>
                  <input type="number" name="price" ref="price" id="price" className="form-control" placeholder="Valor neto"/>
              </div>
          </div>

          <div className="col-md-6">
              <div className="form-group">
                  <strong>Valor visita</strong>
                  <input type="text" name="visit_price" ref="visit_price" id="visit_price" className="form-control" placeholder="Valor visita" readonly=""/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group">
                  <strong>Observaciones</strong>
                  <textarea className="form-control" ref="observations" name="observations" rows="3"></textarea>
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

export default VisitsCreate;