<template>
  <v-container>
      <v-card
        class="mx-auto mb-2"
      >
        <v-card-title>
          <v-icon
            color="green darken-2"
          >
            mdi-cog-refresh
          </v-icon>
          <h4 class="pl-2">항공기 결함 현황</h4>
        </v-card-title>
            <v-form ref="formSearch"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12" md="3" lg="3" xl="3">
                      <v-autocomplete
                        label="기종"
                        outlined
                        dense
                        item-text="configEqCode"
                        return-object
                        autocomplete="off"
                      ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="3" lg="3" xl="3">
                      <v-autocomplete
                        label="호수"
                        outlined
                        dense
                        item-text="topSerailNo"
                        return-object
                        autocomplete="off"
                      ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" lg="2" xl="2">
                      <v-autocomplete
                        label="기간"
                        outlined
                        dense
                        item-text="fromPeriod"
                        return-object
                        autocomplete="off"
                      ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" lg="2" xl="2">
                      <v-autocomplete
                        label="기간"
                        outlined
                        dense
                        item-text="toPeriod"
                        return-object
                        autocomplete="off"
                      ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" md="2" lg="2" xl="2">
                      <v-btn block color="primary" dark @click="searchDefect">
                        <v-icon left>
                          mdi-magnify
                        </v-icon>
                        조회
                      </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

      </v-card>

  <!-- <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="기종"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="호수"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="기간"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form> -->
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:item.topSerialNo="{ item }">
      <v-chip
        :color="getColor()"
        dark
      >
        {{ item.topSerialNo }}
      </v-chip>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: '기종',
          align: 'center',
          value: 'configEqCode'
        },
        { text: '호수', value: 'topSerialNo' },
        { text: '발생일시', value: 'occurTime' },
        { text: '발견시기', value: 'wdc' },
        { text: '결함내용', value: 'wdcContent' }
      ],
      desserts: [
        {
          configEqCode: 'KF-21A',
          topSerialNo: '27-001',
          occurTime: '2027-01-08 17:30',
          wdc: '비행전: 임무포기',
          wdcContent: 'HUD 결함'
        },
        {
          configEqCode: 'KF-21B',
          topSerialNo: '28-002',
          occurTime: '2027-01-08 17:30',
          wdc: '비행전: 임무포기',
          wdcContent: 'MFD 작동안됨'
        }
      ]
    }
  },
  methods: {
    getColor () {
      return 'red'
    },
    searchDefect () {
      console.log(111)
    }
  }
}
</script>
