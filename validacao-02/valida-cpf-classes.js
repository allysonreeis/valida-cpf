class ValidaCPF {
  constructor(cpf){
    Object.defineProperty(this, 'cpfLimpo', {
      enumerable: false,
      configurable: false,
      value: cpf.replace(/\D+/g, '')
    });
  }

  verificaCPF(){
    if(this.cpfLimpo.length  !== 11) return false;
    if(this.sequenciaNumeros()) return false;
    
    this.geraCPF();

    return this.cpfLimpo === this.cpfGerado;
  }

  sequenciaNumeros(){
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
  }

  geraCPF() {
    let cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = this.geraDigito(cpfSemDigitos);
    const digito2 = this.geraDigito(cpfSemDigitos + digito1);

    this.cpfGerado = cpfSemDigitos + digito1 + digito2;
  }

  // cpfParcial é inicialmente o cpf sem dígitos, na primeira chamada 
  geraDigito(cpfParcial) {
    let cpfArray = Array.from(cpfParcial);
    let multiplicadorRegressivo = cpfParcial.length + 1;
    
    let somatorio = cpfArray.reduce((acumulador, numero)=>{
      acumulador += (Number(numero)* multiplicadorRegressivo);
      multiplicadorRegressivo--;

      return acumulador;
    }, 0);

    let digito = 11 - (somatorio % 11);
    return digito > 9 ? '0' : digito;
  }
}


// CPFs aleatórios -> 404.776.070-63 e 512.827.870-04
const validarCpf = new ValidaCPF('512.827.870-04');
console.log(validarCpf.verificaCPF() ? 'CPF válido' : 'CPF inválido');