<template>
  
</template>

<script>
export default {
    props: {
        alerts: [Object]
    },
    methods: {
        getCountOfHighAlerts() {
           let highAlerts = this.alerts.filter(alert => alert.severity == 'high' || alert.severity == 'critical');
           return highAlerts.length;
        },
        getCountOfMediumAlerts() {
           let mediumAlerts = this.alerts.filter(alert => alert.severity == 'medium');
           return mediumAlerts.length;
        },
        getCountOfAllAlerts() {
            return this.alerts.length;
        }
    }
}
</script>

<style>

</style>