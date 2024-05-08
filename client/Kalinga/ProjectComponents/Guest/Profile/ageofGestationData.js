import {View, Text, StyleSheet} from 'react-native'

export const GestationData = [
    { label: 'Premature', value: 'premature' },
    { label: 'Early Term', value: 'early_term' },
    { label: 'Full Term', value: 'full_term' },
    { label: 'Late Term', value: 'late_term' },
    { label: 'Post-term', value: 'post_term' }
  ];

export const sexData = [
    { 
        label: 'Female', 
        value: '1' 
    },

    { 
        label: 'Male',
        value: '2' 
    },
]

export const medicalConditionData = [
    {
        label:"Normal",
        value: "normal"
    },
    {
        label: "Sick",
        value: "sick"
    }

]


  export const GestationExplanation = () => {

    return (
        <View>
            <Text style ={gestationStyles.title}>Premature (Less than 37 weeks):</Text>
            <View style ={{
                marginleft: 10,
             
            }}>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Definition:</Text>
                    <Text style = {gestationStyles.content}>Babies born before completing 37 weeks of gestation.</Text>
                </View>
                <View style = {gestationStyles.condition}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Condition:</Text>
                    <Text style = {gestationStyles.content}>Premature babies may need extra care because their organs and systems are not fully developed. They might require assistance with breathing, feeding, and regulating body temperature. Some premature babies may also experience health issues such as jaundice, respiratory problems, and infections.</Text>
                </View>
            </View>

            <Text style ={gestationStyles.title}>Early Term (37 to 39 weeks):</Text>
            <View style ={{
                marginleft: 10,
             
            }}>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Definition:</Text>
                    <Text style = {gestationStyles.content}>Babies born between 37 and 39 weeks of gestation.</Text>
                </View>
                <View style = {gestationStyles.condition}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Condition:</Text>
                    <Text style = {gestationStyles.content}>Early term babies are considered almost fully developed but may still have a slightly higher risk of health issues compared to babies born at 39 to 41 weeks. However, many early term babies are born healthy and require minimal intervention.</Text>
                </View>
            </View>

            <Text style ={gestationStyles.title}>Full Term (39 to 41 weeks):</Text>
            <View style ={{
                marginleft: 10,
             
            }}>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Definition:</Text>
                    <Text style = {gestationStyles.content}>Babies born between 41 and 42 weeks of gestation.</Text>
                </View>
                <View style = {gestationStyles.condition}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Condition:</Text>
                    <Text style = {gestationStyles.content}>Full term babies are considered mature and typically have fewer health issues compared to premature or early term babies. They are usually born without complications and can feed, breathe, and maintain body temperature without much assistance.</Text>
                </View>
            </View>

            <Text style ={gestationStyles.title}>Late Term (41 to 42 weeks):</Text>
            <View style ={{
                marginleft: 10,
             
            }}>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Definition:</Text>
                    <Text style = {gestationStyles.content}>Babies born between 39 and 41 weeks of gestation.</Text>
                </View>
                <View style = {gestationStyles.condition}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Condition:</Text>
                    <Text style = {gestationStyles.content}>Late term babies are slightly overdue but are usually born healthy. However, they may have a slightly increased risk of certain complications such as meconium aspiration (breathing in stool), macrosomia (being larger than average), and labor difficulties.</Text>
                </View>
            </View>

            <Text style ={gestationStyles.title}>Post-term (More than 42 weeks):</Text>
            <View style ={{
                marginleft: 10,
             
            }}>
                <View style = {{flexDirection: "row"}}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Definition:</Text>
                    <Text style = {gestationStyles.content}>Babies born after 42 weeks of gestation.</Text>
                </View>
                <View style = {gestationStyles.condition}>
                    <Text style = {{fontFamily: "Open-Sans-Bold", marginRight: 10}}>Condition:</Text>
                    <Text style = {gestationStyles.content}>Post-term babies are significantly overdue and may be at increased risk of complications such as stillbirth, meconium aspiration, macrosomia, and placental insufficiency. Induction of labor may be necessary to reduce these risks.</Text>
                </View>
            </View>
        </View>
    );

}

const gestationStyles = StyleSheet.create({
    title: {
        color: "#E60965",
        fontFamily: "Open-Sans-Bold",
        fontSize: 17
    },

    content: {
        textAlign: "justify",
        width:"75%",
        fontSize: 14
    },
    condition: {
        flexDirection: "row",
        marginBottom: 10
    }
})



