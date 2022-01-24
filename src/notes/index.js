//anotações das primeiras aulas

async function dados(){
    await firebase.database().ref('nome').on('value', (snapshot) => {
      setNome(snapshot.val());
    })
  }

  async function dadosNome(){
    await firebase.database().ref('usuarios/2/nome').on('value', (snapshot) => {
      setUserNome(snapshot.val());
    })
  }

  async function dadosIdade(){
    await firebase.database().ref('usuarios/2/idade').on('value', (snapshot) => {
      setUserIdade(snapshot.val());
    })
  }

  //poderia fazer assim pra puxar todos os childs
  async function infosUser(){
    await firebase.database().ref('usuarios/1').on('value', (snapshot) => {
      setUserNome(snapshot.val().nome);
      setUserIdade(snapshot.val().idade);
    })
  }

  // anotações segunda aula
  //criando um nó
      await firebase.database().ref('tipo').set('Vendedor'); 

      //removendo um nó
      await firebase.database().ref('tipo').remove();

      //inserindo um usuário novo dentro de cada child
      await firebase.database().ref('usuarios').child(3).set({
        nome: 'Tony',
        idade: 2
      })

      //não gerar conflito ao atualizar um campo e o outro não
      await firebase.database().ref('usuarios').child(3).update({
        idade: 1.9 
      })