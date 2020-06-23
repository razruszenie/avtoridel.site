<template>
    <div class="body-container">
        <v-card tile outlined>
            <v-card-title
                    style="background-color: #778899;"
                    class="headline white--text"
            >О нас</v-card-title>
            <v-card-text class="pt-4 black--text">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam aut beatae consequatur.</p>
                <p>A aperiam aut beatae consequatur, delectus eos error esse minima nostrum omnis.</p>
                <p>praesentium quibusdam recusandae rem sed sit sunt suscipit ullam voluptate:</p>
                <ul>
                    <li>Proin vitae lorem et nisl varius sollicitudin.</li>
                    <li>Mauris vitae ex at erat ornare tincidunt ut eget est.</li>
                    <li>Duis non mi sed nisl pharetra ullamcorper at eu est.</li>
                    <li>Suspendisse vehicula risus eget quam vulputate hendrerit.</li>
                    <li>Sed tincidunt libero in magna rhoncus, quis auctor sem rutrum.</li>
                    <li>Aenean sed urna pretium, consectetur libero vel, commodo dolor.</li>
                </ul>
                <p class="mt-3">Pellentesque a felis a sem elementum ullamcorper id sit amet dui. Fusce at eros eros
                    Ut ac elit tempus, venenatis urna vitae.</p>
                <p>Donec convallis blandit erat. In tincidunt magna quis mauris sagittis, sit amet placerat ante pretium.
                    Praesent placerat ultricies convallis. Sed et fermentum lectus. Suspendisse potenti.</p>
                <p>Nam tempus erat sapien, at sagittis est ullamcorper non. In hac habitasse platea dictumst. Praesent
                    a nibh congue, fringilla elit faucibus, dictum velit. Nulla nec dui velit. Fusce non magna et
                    est porttitor aliquam.</p>
                <p>Morbi quam tellus, cursus ac porta eu, cursus iaculis velit. Cras blandit diam eu sem malesuada
                    porttitor. Fusce consequat ultrices ipsum, a pretium nulla elementum nec. Ut sed nulla
                    feugiat, varius nibh in, laoreet ex. Sed blandit tellus efficitur nunc mollis aliquam.
                    Donec lobortis felis eu sollicitudin gravida.</p>
                <p>Nam ex lectus, suscipit eu ligula sed, volutpat condimentum arcu. Donec dignissim aliquet lectus,
                    eu cursus nisl dignissim u!</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {

        head() {
            return {
                title: 'О нас | ' + process.env.site_name
            }
        },

        mounted() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }
</script>