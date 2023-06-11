<template>
  <div class="order">
    <form class="user-data">
      <p class="section-tittle">Seus dados</p>

      <div class="form-field">
        <label for="">{{ formData.name.label }}</label>
        <input
          :class="{ error: !this.formData.name.valid }"
          type="text"
          placeholder="Digite seu nome"
          @blur="formData.name.isValid()"
          v-model="formData.name.value" />
        <p class="error" v-if="!this.formData.name.valid">{{ formData.name.error }}</p>
      </div>

      <div class="form-field">
        <label for="">{{ formData.tel.label }}</label>
        <input
          :class="{ error: !this.formData.tel.valid }"
          type="tel"
          placeholder="Digite seu número"
          v-model="formData.tel.value"
          @blur="formData.tel.isValid()"
          v-mask="'(##) # ####-####'" />
        <p class="error" v-if="!this.formData.tel.valid">{{ formData.tel.error }}</p>
      </div>
    </form>

    <form class="delivery">
      <p class="section-tittle">Entrega</p>

      <div class="form-field-radio">
        <div class="radio store">
          <input
            type="radio"
            name="delivery"
            id="store"
            value="Retirar na loja"
            v-model="deliveryType"
            checked />
          <label for="store">Retirar na loja</label>
        </div>
        <div class="radio delivery">
          <input
            type="radio"
            name="delivery"
            id="retirada"
            value="Delivery"
            v-model="deliveryType" />
          <label for="retirada">Delivery</label>
        </div>
      </div>

      <div
        v-if="this.isDeliveryType && this.showAddressCard && hasAddressInfo"
        class="address-content">
        <p>{{ formData.street.value }}, {{ formData.number.value }}</p>
        <p>{{ formData.city.value }} - {{ formData.cep.value }}</p>
        <p v-if="this.formData.complement.value">{{ formData.complement.value }}</p>
      </div>
      <p class="add-address" v-if="isDeliveryType" @click="addAddress()">{{ addressButton }}</p>
    </form>

    <form class="payment">
      <p class="section-tittle">Pagamento</p>
      <p>Método de pagamento:</p>

      <div class="form-field-radio">
        <div class="radio credit-card">
          <input
            type="radio"
            name="paymentType"
            id="creditCard"
            value="Cartão de Crédito"
            v-model="paymentType" />
          <label for="creditCard">Cartão de crédito</label>
        </div>

        <div class="radio money">
          <input
            type="radio"
            name="paymentType"
            id="money"
            value="Dinheiro"
            v-model="paymentType" />
          <label for="money">Dinheiro</label>
        </div>
      </div>
    </form>

    <button class="primary-button order-button" @click="orderItems">Finalizar pedido</button>

    <modal class="address--modal" :show="showAdressModal" @modal-close="showAdressModal = false">
      <form>
        <h2>Adicionar endereço</h2>

        <div class="form-field cep">
          <label for="">{{ formData.cep.label }}</label>
          <input
            :class="{ error: !this.formData.cep.valid }"
            @blur="insertCep"
            type="text"
            v-model="formData.cep.value"
            v-mask="'#####-###'" />
          <p class="error" v-if="!this.formData.cep.valid">{{ formData.cep.error }}</p>
        </div>

        <div class="address--modal-content">
          <div class="form-field street">
            <label for="">{{ formData.street.label }}</label>
            <input
              :class="{ error: !this.formData.street.valid }"
              @blur="formData.street.isValid()"
              type="text"
              v-model="formData.street.value" />
            <p class="error" v-if="!this.formData.street.valid">{{ formData.street.error }}</p>
          </div>

          <div class="form-field number">
            <label for="">{{ formData.number.label }}</label>
            <input
              :class="{ error: !this.formData.number.valid }"
              @blur="formData.number.isValid()"
              type="number"
              v-model="formData.number.value" />
            <p class="error" v-if="!this.formData.number.valid">{{ formData.number.error }}</p>
          </div>
        </div>

        <div class="form-field complement">
          <label for="">{{ formData.complement.label }}</label>
          <input type="text" v-model="formData.complement.value" />
        </div>

        <div class="form-field city">
          <label for="">{{ formData.city.label }}</label>
          <input
            :class="{ error: !this.formData.city.valid }"
            @blur="formData.city.isValid()"
            type="text"
            v-model="formData.city.value" />
          <p class="error" v-if="!this.formData.city.valid">{{ formData.city.error }}</p>
        </div>
      </form>

      <div class="address--modal-buttons">
        <button class="secundary-button" @click="cancelAddress()">Cancelar</button>
        <button class="primary-button" @click="saveAddress()">Salvar endereço</button>
      </div>
    </modal>

    <modal
      class="no-address-modal"
      :show="showNoAddressModal"
      @modal-close="showNoAddressModal = false">
      <div v-html="alertIcon"></div>
      <div>
        <p>É necessário cadastrar um endereço!</p>
      </div>
    </modal>

    <modal class="successModal" :show="showSuccessModal" @modal-close="showSuccessModal = false">
      <div v-html="successIcon"></div>
      <p>Seu pedido foi finalizado com sucesso, clique no botão abaixo para enviar o pedido!</p>
      <button class="primary-button" @click="sendOrder">Enviar pedido</button>
    </modal>
  </div>
</template>

<script>
import modal from "./Modal.vue";
import feather from "feather-icons";
import axios from "axios";

export default {
  name: "PaymentData",
  data() {
    return {
      formData: {
        name: {
          value: "",
          label: "Nome*",
          error: "O campo nome é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.name.valid = !!this.formData.name.value.length;
          },
        },
        tel: {
          value: "",
          label: "Celular*",
          error: "O campo telefone é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.tel.valid = this.formData.tel.value.length == 16;
          },
        },
        cep: {
          value: "",
          label: "cep*",
          error: "O campo cep é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.cep.valid = this.formData.cep.value.length == 9;
          },
        },
        street: {
          value: "",
          label: "Rua*",
          error: "O campo Rua é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.street.valid = !!this.formData.street.value.length;
          },
        },
        number: {
          value: "",
          label: "Número*",
          error: "O campo número é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.number.valid = !!this.formData.number.value.length;
          },
        },
        complement: {
          value: "",
          label: "Complemento",
        },
        city: {
          value: "",
          label: "Cidade*",
          error: "O campo cidade é obrigatório",
          valid: true,
          isValid: () => {
            this.formData.city.valid = !!this.formData.city.value.length;
          },
        },
      },
      showAdressModal: false,
      showNoAddressModal: false,
      showSuccessModal: false,
      showAddressCard: false,
      deliveryType: "Retirar na loja",
      paymentType: "Cartão de Crédito",
      addressValue: "",
      observationValue: this.$store.state.cartList.observation,
    };
  },
  components: {
    modal,
  },
  computed: {
    alertIcon() {
      return feather.icons["alert-triangle"].toSvg();
    },
    successIcon() {
      return feather.icons["check-circle"].toSvg();
    },
    isFormAddressValid() {
      let isValid = true;
      isValid &= this.formData.cep.valid;
      isValid &= this.formData.street.valid;
      isValid &= this.formData.number.valid;
      isValid &= this.formData.city.valid;
      return isValid;
    },
    isDeliveryType() {
      return this.deliveryType === "Delivery";
    },
    hasAddressInfo() {
      return (
        this.formData.cep.value ||
        this.formData.street.value ||
        this.formData.number.value ||
        this.formData.city.value
      );
    },
    addressButton() {
      return this.hasAddressInfo && this.showAddressCard ? "Editar endereço" : "Adicionar endereço";
    },
  },
  methods: {
    triggerDataValidations() {
      this.formData.name.isValid();
      this.formData.tel.isValid();
    },
    triggerAddressValidations() {
      this.formData.cep.isValid();
      this.formData.street.isValid();
      this.formData.number.isValid();
      this.formData.city.isValid();
    },
    orderItems() {
      this.triggerDataValidations();

      if (!this.formData.name.valid || !this.formData.tel.valid) {
        return;
      }

      if (this.deliveryType === "Delivery" && !this.hasAddressInfo) {
        this.showNoAddressModal = true;
        return;
      }
      this.showSuccessModal = true;
    },
    addAddress() {
      this.formData.cep.valid = true;
      this.formData.street.valid = true;
      this.formData.number.valid = true;
      this.formData.city.valid = true;
      this.showAdressModal = true;
    },
    cancelAddress() {
      this.showAdressModal = false;
    },
    saveAddress() {
      this.triggerAddressValidations();
      if (!this.isFormAddressValid) return;
      this.showAdressModal = false;
      this.showAddressCard = true;
    },
    addressInfo() {
      if (this.hasAddressInfo) {
        this.addressValue = `
        %0AEndereço: ${this.formData.street.value} - ${this.formData.number.value}
        %0A${this.formData.city.value} - ${this.formData.cep.value}`;
      }
    },
    sendOrder() {
      this.addressInfo();
      const storePhone = 5531996101036;
      let orderItems = `Cliente: ${this.formData.name.value} 
      %0AContato: ${this.formData.tel.value}
      %0AMétodo de Pagamento: ${this.paymentType}
      %0A${this.deliveryType}
      %0A${this.addressValue}
      %0APedido:${this.$store.state.cartList.map((item) => {
        if(item.observation == undefined){
          item.observation = "sem observação"
        }
        return `%0A${item.quantity}x ${item.name}
                %0Aobs: ${item.observation}
                %0A
                `;
      })}`;

      window.open(`https://api.whatsapp.com/send?phone=${storePhone}&text=${orderItems}`);
    },
    async insertCep(){
      this.formData.cep.isValid()

      await axios.get(`https://viacep.com.br/ws/${this.formData.cep.value}/json/`).then((response) => {
        if(response.data.erro == true){
          this.formData.cep.value = ''
          alert(`Número de CEP inválido`)
          
          return
        }

          this.formData.street.value = `${response.data.logradouro}, ${response.data.bairro}`
          this.formData.city.value = `${response.data.localidade}, ${response.data.uf}`
          

        })
        .catch(error => {
          return
        })
    }
  },
};
</script>

<style lang="less" scoped>
.order {
  width: 720px;
  background: white;
  padding: 30px 40px;
  margin: auto;
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    margin-bottom: 50px;

    .section-tittle {
      font-weight: 600;
      font-size: 22px;
      margin: 0 0 5px 0;
    }

    .form-field {
      display: flex;
      flex-direction: column;

      &-radio {
        display: flex;
        .radio:first-child {
          margin-right: 40px;
        }
      }
    }

    .address-content {
      border: 1px solid @light-grey;
      border-radius: 8px;
      width: fit-content;
      padding: 0 15px;
    }

    .add-address {
      font-size: 12px;
      color: red;
      cursor: pointer;
      margin: 0;
    }
  }

  .user-data {
    .form-field + .form-field {
      margin-top: 20px;
    }
  }
  .address--modal {
    &-buttons {
      text-align: center;
    }

    &-content {
      .form-field {
        & + .form-field {
          margin-left: 10px;
        }
      }
      display: flex;
      .street {
        width: 100%;
      }
      .number {
        width: 30%;
      }
    }
  }

  .no-address-modal,
  .successModal {
    text-align: center;
  }

  .order-button {
    margin: 0;
    width: 100%;
  }

  @media @smallDesktop {
    width: 530px;

    form {
      margin-bottom: 20px;
      .section-tittle {
        font-size: 16px;
      }

      input {
        margin-bottom: 5px;
      }

      label {
        font-size: 12px;
      }
    }

    .payment {
      p + p {
        font-size: 12px;
      }
    }
  }

  @media @smartphone {
    width: 100%;
    padding: 30px 10px;

    .address--modal {
      button {
        margin: 0;
      }
      button + button {
        margin: 0 0 0 5px;
      }

      &-content .form-field + .form-field {
        margin-left: 5px;
      }
    }
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>
