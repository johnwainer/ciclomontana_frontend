import React from 'react';
class Clients extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: {}
    };
  }

  componentDidMount() {
    this._isMounted = true;
    fetch(process.env.REACT_APP_SERVICE_URL + "/client/clients_list_service")
      .then(res => res.json())
      .then(
        (result) => {
          if (this._isMounted) {
            this.setState({
              isLoaded: true,
              items: result
            });
          }
        },
        (error) => {
          if (this._isMounted) {
            this.setState({
              isLoaded: true,
              error
            });
          }
        }
      )
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <tbody><tr key='error'><td colSpan="9">Error: {error.message}</td></tr></tbody>;
    } else if (!isLoaded) {
      return <tbody><tr key='loading'><td colSpan="9">Cargando...</td></tr></tbody>;
    } else {
      return (
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.city_name}</td>
              <td>{item.quota}</td>
              <td>{item.quota_balance}</td>
              <td>{item.visits_percentage}</td>
              <td><button className="btn btn-primary"> Editar </button></td>
              <td><button className="btn btn-danger"> Eliminar </button></td>
            </tr>
          ))}
        </tbody>
      );
    }
  }
}

export default Clients;